"use strict";

// Unpkg imports
let Web3Modal;
let WalletConnectProvider;

let authereum;

// Web3modal instance
let web3Modal;

// Chosen wallet provider given by the dialog window
let provider;

// Address of the selected account
let selectedAccount;
let networkAllowedDecimals;
let abiXGT;
let abiXGTStakeMainnet;
let abiDAI;
let abiMigrator;
let abiCDAI;
let abiBridge;
let abiRouter;
let abiPair;
let abiCashbackModule;
let abiStaking;
let abiStakingv2;
let abiLockStaking;
let abiRewardChest;
let abiPoolModule;
let abiXDaiHelper;
let abiAMBHelper;
let abiAMBMainnet;
let abiDAIBridgeMainnet;
let abiOracle;
let abiNFTChest;
let addressXGT;
let addressXGTStakeXDai = "0x50d11E814B1cfd303369d79Dc941d9492f85043d";
let addressXGTStakeBSC = "0xf50854E97b37Ecea700b46949b38a27034A89176";
let addressXGTBSC = "0xc25af3123d2420054c8fcd144c21113aa2853f39";
let addressXGTStakeMainnet;
let oracleGas = "0x169E633A2D1E6c10dD91238Ba11c4A708dfEF37C";
let oracleEthDai = "0x773616E4d11A78F511299002da57A0a94577F1f4";

let addressPoolModule = "0xbBBbeE73521b44e87396c8415F04a3e00fa482A0";
let addressCashbackModule = "0xc6036F804C51733462581874d3651A144eD1dBF7";

let addressRewardChest = "0xC2F128d188d095A47d5459C75de8185060df5E2f";
let addressRewardChestBSC = "0x9937E2454bEFE975ba1A2C78cc7750083660331e";

let addressDAI;

let addressCDAI;

let addressRouter;

let addressWETHXDAI;
let addressWETHBSC = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
let addressWETHETH = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

let addressPair;

let addressXDaiHelper;

let addressDAIBridgeMainnet;

let addressDAIBridgeXDai;

let abiEIP712;

let web3;

let web3xDai;
let web3Mainnet;
let web3bsc;

let combinedAPY = 0;
let lpAPY = 0;
let lpAPM = 0;

let bnbPrice = 0;
let ethPrice = 0;

let lastLPValue = 0;

let currentRight = "0";
let currentLeft = "0";
let fixedLeft = true;

let xgtPrice = 0;
let lpRatioXDAI;
let lpRatioETH;
let lpRatioBSC;
let lpValue = 0;
let lpShares = 0;
let lpReserve = 0;
let lpBase = 0;
let lpXGT = 0;
let tvl = 0;
let tvlCheckRunning = false;

let gBalanceXDai;
let gBalanceXGTXDai;
let gBalanceXGTETH;
let gBalanceXGTBSC;
let gBalanceDAI;
let gBalanceBNB;
let gBalanceETH;

let stakeValue = 0;

let INIT_DONE = false;
let VALUES_LOADED = false;

let swapId = 0;
let withdrawId = 1;
let unclaimedXGT;
let halfXGTAmount;

let txUrlMainnet;
let txUrlXDai;
let txUrlBSC;

let bridgeStep = 0;

let mainnet, mainnetId, mainnetRpc;
let xdai, xdaiId, xdaiRpc;

let decimalsCDai = 8;
let decimalsDai;

let paySelf = true;
let withdrawHash = null;
let swapHash = null;
let swapEncodedData = null;

let firstConnect = false;

let metaTxAPI;
let permitTxAPI;

let torusId;
let torusHost;
let domainData;

let migrationBaseBalance;

let latestInfo;
let latestInfoRequest;

let selectedNetwork = "xDAI";
let nativeCurrency = false;
let availableNetworks = ["xDAI", "BSC", "ETH"];

let uint256Max;

// if (window.location.href.indexOf("binbash") != -1) {
//     domainData = {
//         name: "XGTStake",
//         version: "1",
//         chainId: 42,
//         verifyingContract: "0x6eC71fBb3945C4cE2Decb7c5a4AE8Da7A947424c"
//     };
//     metaTxAPI = "https://dev.binbash.sh/metatx-api/metatx";
//     decimalsDai = 6;
//     mainnet = "Kovan Network";
//     mainnetId = 42;
//     mainnetRpc = "https://kovan.infura.io/v3/0a377d98f2ac47fe9dcc44f8ec660256";
//     xdai = "Sokol Network";
//     xdaiId = 77;
//     xdaiRpc = "https://sokol.poa.network";
//     txUrlMainnet = "https://kovan.etherscan.io/tx/";
//     txUrlXDai = "https://blockscout.com/poa/sokol/tx/";
//     torusId = xdaiId;
//     torusHost = "https://sokol.poa.network";
//     addressXGT = "0x455da55370E3815cE1468Bc6B6a75FF669e73116";

//     addressXGTStakeMainnet = "0x6eC71fBb3945C4cE2Decb7c5a4AE8Da7A947424c";

//     addressDAI = "0xb7a4f3e9097c08da09517b5ab877f7a917224ede";

//     addressCDAI = "0x4a92e71227d294f041bd82dd8f78591b75140d63";

//     addressRouter = "0x278F4d93c544338D389490FbCb0ef865119FE31C";

//     addressWETHXDAI = "0x846b00E989aE5C6ba590743fcc82703FCA446Ae0";

//     addressPair = "0xc162675B8c38397C51Ae32C74364c243E517dcd4";

//     addressXDaiHelper = "0x6A92e97A568f5F58590E8b1f56484e6268CdDC51";

//     addressDAIBridgeMainnet = "0x4aa42145Aa6Ebf72e164C9bBC74fbD3788045016";

//     addressDAIBridgeXDai = "0x7301CFA0e1756B71869E93d4e4Dca5c7d0eb0AA6";

// } else {
domainData = {
    name: "RewardChest",
    version: "1",
    chainId: 56,
    verifyingContract: "0xC2F128d188d095A47d5459C75de8185060df5E2f",
};
metaTxAPI = "https://xion.finance/metatx-api/metatx";
permitTxAPI = "https://xion.finance/metatx-api/permittx";
decimalsDai = 18;
mainnet = "Ethereum Mainnet";
mainnetId = (1).toString(16);
mainnetRpc = "https://xion.finance/eth-rpc";
let bsc = "Binance Smart Chain";
let bscRpc =
    "https://nameless-empty-meadow.bsc.quiknode.pro/f10040924617f9a0fbd0d0f5f6424b8cc4fa74e4/";
let bscId = (56).toString(16);
xdai = '<u><a href="faq?switchToxDai" target="_blank">xDAI Network</a></u>';
xdaiId = (100).toString(16);
xdaiRpc = "https://xdai-archive.blockscout.com";
let xdaiRpcFallback = "https://rpc.gnosischain.com/";
txUrlMainnet = "https://etherscan.io/tx/";
txUrlXDai = "https://gnosisscan.io/tx/";
txUrlBSC = "https://bscscan.com/tx/";
torusId = parseInt(xdaiId, 16);
torusHost = xdaiRpcFallback;
addressXGT = "0xc25af3123d2420054c8fcd144c21113aa2853f39"; // CHANGE
addressXGTStakeMainnet = "0xa294A842A34ab045ddb1E6eE07c417a1e13c2eDf";
addressDAI = "0x6b175474e89094c44da98b954eedeac495271d0f";
addressCDAI = "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643";
addressRouter = "0x5a673720fBdDB078Bc26958e64fE03A3Ac8836d7";
let addressRouterBSC = "0x325ee48a8a126d9758acdfe8789f33342e848022";
let addressRouterETH = "0x7a250d5630b4cf539739df2c5dacb4c659f2488d";
let addressRouterOLD = "0x5170Bdae56b22D96721E7867aa296802ED498Ec0";
addressWETHXDAI = "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d";
addressPair = "0x27f363a0eA6EF8b406aEA8c0CC09C9C8F69bb25c"; // CHANGE
let addressPairOLD = "0x2745aA5c196bb8eCdBc43A1b15dFCC1f3a711611";
let addressPairUniETH = "0x6545662aacbd34b36123ff4850905bcaea3635ad"; // OLD
let addressPairBSC = "0x4dE0ed25feD42DE0D22fa9181aeD7F4E42b583E9"; // CHANGE
addressXDaiHelper = "0x6A92e97A568f5F58590E8b1f56484e6268CdDC51";
let addressAMBHelper = "0x7d94ece17e81355326e3359115D4B02411825EdD";
let addressAMBHelperBSCtoXDAI = "0x68C69307a0975D2636fA9772c7633204648788A8";
let addressAMBMainnet = "0x4c36d2919e407f0cc2ee3c993ccf8ac26d9ce64e";
addressDAIBridgeMainnet = "0x4aa42145Aa6Ebf72e164C9bBC74fbD3788045016";
addressDAIBridgeXDai = "0x7301CFA0e1756B71869E93d4e4Dca5c7d0eb0AA6";

const domainType = [
    {
        name: "name",
        type: "string",
    },
    {
        name: "version",
        type: "string",
    },
    {
        name: "chainId",
        type: "uint256",
    },
    {
        name: "verifyingContract",
        type: "address",
    },
];

const metaTransactionType = [
    {
        name: "nonce",
        type: "uint256",
    },
    {
        name: "from",
        type: "address",
    },
    {
        name: "functionSignature",
        type: "bytes",
    },
];

let daiSymbol =
    '<g> <g> <path fill="#f9b52c" d="M43.025 43.507c-2.612 2.107-5.599 3.285-8.92 3.678-1.367.16-2.732.17-4.102.17-3.6-.002-7.2-.007-10.8.007-.4.002-.512-.118-.509-.512.013-1.926-.002-3.852-.007-5.78.06-1.307.07-2.615-.006-3.923-.009-.064-.047-.087-.109-.077-1.306-.005-2.613-.022-3.918-.007-.36.004-.469-.107-.462-.462.021-.971.017-1.943.003-2.914-.004-.292.091-.384.383-.381 1.242.014 2.485-.005 3.728.013.338.006.434-.098.428-.43a83.897 83.897 0 0 1-.002-3.01c.006-.354-.078-.5-.475-.49-1.21.027-2.422-.002-3.632.017-.332.006-.437-.085-.429-.423.022-.955.023-1.911.001-2.866-.008-.353.088-.468.453-.461 1.195.023 2.391-.006 3.585.017.378.007.482-.108.481-.484-.007-3.137.016-6.274.004-9.412-.002-.427.117-.522.531-.521 4.238.016 8.476-.014 12.714.016 4.298.032 8.181 1.282 11.473 4.12a14.587 14.587 0 0 1 4.13 5.873c.118.305.25.414.578.408 1.067-.022 2.135.002 3.202-.015.313-.005.41.088.404.402-.018.987-.02 1.975.002 2.962.008.337-.126.388-.416.382-.796-.016-1.593.008-2.39-.012-.3-.007-.398.088-.358.38.14 1.048.101 2.098-.01 3.144-.037.335.09.407.394.4.78-.015 1.561.01 2.341-.011.32-.008.447.064.44.414a73.12 73.12 0 0 0-.003 2.962c.005.293-.085.384-.378.38-1.083-.015-2.167.006-3.25-.013-.34-.006-.549.05-.67.419-.266.798-.702 1.522-1.088 2.266-.952 1.4-2.014 2.703-3.34 3.774zm-20.652.124c-.002.25.081.325.328.324 3.307-.014 6.615-.02 9.923-.026a13.493 13.493 0 0 0 3.152-.481c3.364-.931 5.97-2.846 7.66-5.938.248-.457.245-.462-.249-.462-6.786-.001-13.572-.001-20.358.003-.147 0-.323-.076-.437.095-.005 2.162-.007 4.323-.019 6.485zM43.19 25.664c.52 0 .517-.007.282-.452-.708-1.337-1.617-2.515-2.773-3.494-2.557-2.167-5.562-3.08-8.865-3.104-2.995-.022-5.99.004-8.984-.015-.417-.002-.495.137-.492.517.018 1.99.023 3.98 0 5.972-.006.449.093.59.568.588 3.362-.022 6.723-.011 10.084-.011l10.18-.001zm1.053 7.66c.472.004.6-.167.615-.583.037-.94.046-1.88-.003-2.818-.018-.361-.106-.546-.557-.538-1.959.033-3.919.014-5.879.014-5.194 0-10.389.004-15.583-.008-.377-.001-.485.099-.475.476.027.987.032 1.975.001 2.962-.013.415.132.493.514.49 3.57-.013 7.14-.007 10.708-.007 3.553 0 7.106-.011 10.66.013z" /> </g> <g> <path fill="none" stroke="#f9b52c" stroke-miterlimit="20" d="M62.21 31.717c0 16.885-13.687 30.573-30.572 30.573-16.885 0-30.573-13.688-30.573-30.573 0-16.885 13.688-30.573 30.573-30.573 16.885 0 30.573 13.688 30.573 30.573z" /> </g> </g>';
let xdaiSymbol =
    '<g transform="matrix(0.304813,0,0,0.304813,3,3)"><path d="M160.286,0L26.714,0C11.96,0 0,11.96 0,26.714L0,160.286C0,175.04 11.96,187 26.714,187L160.286,187C175.04,187 187,175.04 187,160.286L187,26.714C187,11.96 175.04,0 160.286,0Z" style="fill:rgb(0,51,113);fill-rule:nonzero;"/></g><g transform="matrix(0.304813,0,0,0.304813,3,3)"><path d="M141.175,46.266C139.775,44.87 138.113,43.763 136.284,43.007C134.455,42.252 132.494,41.863 130.514,41.863C128.534,41.863 126.574,42.252 124.745,43.007C122.915,43.763 121.253,44.87 119.854,46.266L83.141,82.864C81.74,84.26 80.63,85.917 79.872,87.74C79.114,89.564 78.724,91.518 78.724,93.492C78.724,95.465 79.114,97.42 79.872,99.243C80.63,101.067 81.74,102.723 83.141,104.119L119.854,140.717C121.253,142.113 122.915,143.221 124.745,143.976C126.574,144.732 128.534,145.12 130.514,145.12C132.494,145.12 134.455,144.732 136.284,143.976C138.113,143.221 139.775,142.113 141.175,140.717C142.575,139.322 143.686,137.665 144.444,135.842C145.201,134.018 145.592,132.064 145.592,130.09C145.592,128.116 145.201,126.162 144.444,124.339C143.686,122.515 142.575,120.858 141.175,119.463L118.665,97.04C118.196,96.574 117.824,96.021 117.571,95.412C117.317,94.804 117.187,94.151 117.187,93.492C117.187,92.832 117.317,92.18 117.571,91.571C117.824,90.962 118.196,90.409 118.665,89.944L141.175,67.52C142.575,66.125 143.686,64.468 144.444,62.645C145.201,60.821 145.592,58.867 145.592,56.893C145.592,54.919 145.201,52.965 144.444,51.141C143.686,49.318 142.575,47.661 141.175,46.266Z" style="fill:rgb(4,121,91);fill-rule:nonzero;"/></g><g transform="matrix(0.304813,0,0,0.304813,3,3)"><path d="M119.848,140.713C125.735,146.581 135.279,146.581 141.166,140.713C147.052,134.845 147.052,125.33 141.166,119.462L104.452,82.863C98.565,76.994 89.021,76.994 83.134,82.863C77.248,88.731 77.248,98.245 83.134,104.114L119.848,140.713Z" style="fill:rgb(13,181,10);fill-rule:nonzero;"/></g><g transform="matrix(0.304813,0,0,0.304813,3,3)"><path d="M104.462,82.864L67.749,46.266C66.349,44.87 64.687,43.763 62.858,43.007C61.029,42.252 59.068,41.863 57.088,41.863C55.108,41.863 53.147,42.252 51.318,43.007C49.489,43.763 47.827,44.87 46.427,46.266C45.027,47.661 43.916,49.318 43.158,51.141C42.401,52.965 42.011,54.919 42.011,56.893C42.011,58.867 42.401,60.821 43.158,62.645C43.916,64.468 45.027,66.125 46.427,67.52L68.921,89.944C69.39,90.409 69.761,90.962 70.015,91.571C70.268,92.18 70.399,92.832 70.399,93.492C70.399,94.151 70.268,94.804 70.015,95.412C69.761,96.021 69.39,96.574 68.921,97.04L46.427,119.463C45.027,120.858 43.916,122.515 43.158,124.339C42.401,126.162 42.011,128.116 42.011,130.09C42.011,132.064 42.401,134.018 43.158,135.842C43.916,137.665 45.027,139.322 46.427,140.717C47.827,142.113 49.489,143.221 51.318,143.976C53.147,144.732 55.108,145.12 57.088,145.12C59.068,145.12 61.029,144.732 62.858,143.976C64.687,143.221 66.349,142.113 67.749,140.717L93.793,114.738L104.462,104.119C105.862,102.723 106.973,101.067 107.731,99.243C108.488,97.42 108.878,95.465 108.878,93.492C108.878,91.518 108.488,89.564 107.731,87.74C106.973,85.917 105.862,84.26 104.462,82.864Z" style="fill:rgb(10,227,58);fill-rule:nonzero;"/></g><g transform="matrix(0.304813,0,0,0.304813,3,3)"><path d="M130.506,71.928C138.831,71.928 145.58,65.201 145.58,56.901C145.58,48.602 138.831,41.875 130.506,41.875C122.181,41.875 115.432,48.602 115.432,56.901C115.432,65.201 122.181,71.928 130.506,71.928Z" style="fill:rgb(10,227,58);fill-rule:nonzero;"/></g>';
let usdSymbol =
    '<g> <g> <path fill="#f9c045" d="M28.706 11.282c1.695.686 3.284 1.314 4.858 1.975.49.206.628.679.635 1.176.01.698.042 1.4-.011 2.094-.042.56.149.735.699.806 1.715.223 3.33.764 4.774 1.746 1.569 1.069 2.59 2.52 2.994 4.382.034.159-.037.456-.148.512-1.633.825-3.281 1.619-4.957 2.435-.065-.123-.127-.204-.152-.295-.775-2.788-2.65-4.216-5.55-4.215-1.145 0-2.225.244-3.14.972-2.153 1.715-1.986 4.785.416 6.137.953.536 2.079.777 3.144 1.096 2.055.615 4.14 1.134 6.18 1.794 3.238 1.048 4.787 3.336 4.842 6.723.08 4.953-3.438 8.442-7.298 9.54-.353.1-.706.199-1.062.284-.728.175-.727.17-.727.946l-.002 5.396v.613c-.25-.085-.424-.133-.59-.201-1.291-.53-2.573-1.084-3.875-1.587-.757-.293-1.096-.791-1.073-1.596.026-.96-.015-1.922.018-2.881.014-.417-.127-.56-.53-.647-2.085-.447-4.075-1.203-5.48-2.85-1.065-1.247-1.853-2.732-2.745-4.124-.054-.084.015-.361.1-.404 1.662-.844 3.336-1.666 5.037-2.508.045.067.09.107.1.154.533 2.205 2.024 3.396 4.154 3.865 1.713.378 3.406.382 4.96-.597 1.387-.874 2.063-2.39 1.672-3.805-.377-1.365-1.402-2.117-2.68-2.488-1.371-.397-2.776-.676-4.171-.988-1.622-.362-3.236-.743-4.676-1.623-2.247-1.373-3.313-3.511-3.835-5.99-.358-1.695-.305-3.378.332-4.997.989-2.511 3.009-3.806 5.498-4.493.586-.162 1.193-.257 1.797-.342.34-.047.466-.17.462-.53-.018-1.588-.007-3.177-.004-4.766 0-.202.018-.404.034-.72z"> </path> </g> <g> <path fill="none" stroke="#f9c045" stroke-miterlimit="20" d="M62.284 31.851c0 16.885-13.688 30.573-30.573 30.573-16.885 0-30.573-13.688-30.573-30.573 0-16.885 13.688-30.573 30.573-30.573 16.885 0 30.573 13.688 30.573 30.573z"> </path> </g> </g>';
let xgtSymbol =
    '<g> <g> <path fill="#29a5dc" d="M24.655 27.155c-2.07 2.356-2.049 3.89.01 6.26 7.052 8.119 14.111 16.234 21.16 24.357 9.4-5.177 15.77-15.177 15.77-26.666 0-11.814-6.735-22.056-16.575-27.095-6.786 7.716-13.584 15.423-20.365 23.144z" /> </g> <g> <path fill="#fcfcfc" d="M56.798 24.685l-.35 1.989a.871.871 0 0 1-.857.72c-3.157-.001-15.411-.006-16.273.003-2.077.024-4.043 2.012-4.052 4.085-.006 1.42 1.043 2.556 2.459 2.64.458.029 4.64.026 5.099.012.1-.003.267-.101.284-.18.123-.588.216-1.182.324-1.811h-3.025c.162-.925.315-1.81.472-2.713h5.752L45.34 36.8c-.037.023-3.78.046-3.8.046-1.7-.031-3.416.205-5.098-.146-1.864-.38-3.741-2.28-3.856-4.432-.166-3.101 1.313-5.282 3.922-6.776 1.014-.58 2.127-.831 3.303-.811 1.173.019 16.804.004 16.987.004z" /> </g> <g> <path fill="#fcfcfc" d="M49.351 29.404l-.719 4.046c-.198 1.115-.391 2.23-.593 3.39.886 0 1.32.007 2.175-.013.07 0 .597.011.705-.618.408-2.383.758-4.423 1.168-6.805z" /> </g> <g> <path fill="#f0f" d="M17.82 40.166c-1.555-1.773-3.27-1.725-4.896.052-2.365 2.586-4.69 5.207-7.027 7.821 5.461 8.134 14.743 13.488 25.276 13.488a30.61 30.61 0 0 0 4.895-.394C29.991 54.14 23.93 47.131 17.82 40.166z" /> </g> <g> <path fill="#29a5dc" d="M12.536 19.773c2.12 2.418 3.736 2.402 5.883-.058C23.889 13.449 29.352 7.174 34.817.902a30.853 30.853 0 0 0-3.643-.218c-10.042 0-18.947 4.867-24.487 12.37 1.946 2.242 3.89 4.487 5.849 6.719z" /> </g> <g> <path fill="#f0f" d="M6.825 27.96c-.086-.114-3.016-3.127-4.943-5.095a30.441 30.441 0 0 0-1.13 8.241c0 2.65.34 5.222.977 7.673 2.02-2.436 4.552-5.419 5.064-6.057 1.308-1.63 1.29-3.09.032-4.762z" /> </g> <g> <path fill="none" stroke="#29a5dc" stroke-linecap="round" stroke-miterlimit="20" d="M42.725 3.813c-6.787 7.716-13.584 15.423-20.366 23.144-2.069 2.356-2.049 3.891.009 6.26 7.053 8.12 14.112 16.234 21.162 24.356" /> </g> <g> <path fill="none" stroke="#f0f" stroke-linecap="round" stroke-miterlimit="20" d="M3.92 38.854c2.021-2.436 4.552-5.418 5.064-6.057 1.308-1.63 1.29-3.09.032-4.762-.04-.054-.724-.764-1.638-1.704" /> </g> <g> <path fill="none" stroke="#f0f" stroke-linecap="round" stroke-miterlimit="20" d="M36.242 58.45c-6.077-6.993-12.14-14-18.248-20.966-1.555-1.774-3.271-1.725-4.896.052" /> </g> </g>';
let bnbSymbol =
    '<g id="surface1"><path style="fill:none;stroke-width:0.5;stroke-linecap:butt;stroke-linejoin:miter;stroke:rgb(94.117647%,72.54902%,4.313725%);stroke-opacity:1;stroke-miterlimit:10;" d="M 15.350074 30.179253 C 23.330729 30.179253 29.800595 23.71131 29.800595 15.730655 C 29.800595 7.75 23.330729 1.280134 15.350074 1.280134 C 7.36942 1.280134 0.899554 7.75 0.899554 15.730655 C 0.899554 23.71131 7.36942 30.179253 15.350074 30.179253 Z M 15.350074 30.179253 " transform="matrix(2.032258,0,0,2.032258,0,0)"/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(94.117647%,72.54902%,4.313725%);fill-opacity:1;" d="M 20.890625 32.171875 L 16.644531 36.457031 L 12.355469 32.171875 L 16.644531 27.902344 Z M 31.277344 21.804688 L 38.59375 29.140625 L 42.878906 24.855469 L 35.542969 17.558594 L 31.277344 13.269531 L 19.691406 24.855469 L 23.980469 29.140625 Z M 45.886719 27.902344 L 41.640625 32.171875 L 45.910156 36.457031 L 50.175781 32.171875 Z M 31.277344 42.554688 L 23.941406 35.21875 L 19.691406 39.507812 L 27.007812 46.824219 L 31.277344 51.089844 L 35.542969 46.800781 L 42.878906 39.464844 L 38.59375 35.21875 Z M 31.277344 36.457031 L 35.542969 32.171875 L 31.277344 27.902344 L 26.988281 32.171875 Z M 31.277344 36.457031 "/></g>';
let ethSymbol =
    '<g id="surface1"><path style="fill:none;stroke-width:0.5;stroke-linecap:butt;stroke-linejoin:miter;stroke:rgb(0%,0%,0%);stroke-opacity:1;stroke-miterlimit:10;" d="M 15.350074 30.040861 C 23.330729 30.040861 29.800595 23.570995 29.800595 15.59034 C 29.800595 7.609685 23.330729 1.139819 15.350074 1.139819 C 7.36942 1.139819 0.899554 7.609685 0.899554 15.59034 C 0.899554 23.570995 7.36942 30.040861 15.350074 30.040861 Z M 15.350074 30.040861 " transform="matrix(2.032258,0,0,2.032258,0,0)"/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(54.901961%,54.901961%,54.901961%);fill-opacity:1;" d="M 17.925781 32.800781 C 17.976562 32.671875 18.042969 32.546875 18.128906 32.433594 L 20.503906 28.472656 L 23.492188 23.535156 C 24.449219 21.96875 25.382812 20.382812 26.339844 18.796875 L 29.164062 14.125 L 31.195312 10.914062 L 31.195312 26.824219 L 30.058594 27.355469 L 28.125 28.226562 L 25.382812 29.46875 L 23.351562 30.382812 L 20.402344 31.722656 L 18.1875 32.71875 C 18.109375 32.765625 18.015625 32.792969 17.925781 32.800781 Z M 17.925781 32.800781 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(20.392157%,20.392157%,20.392157%);fill-opacity:1;" d="M 31.15625 26.804688 L 31.15625 10.894531 L 33.816406 15.300781 L 44.304688 32.699219 L 44.304688 32.800781 L 43.796875 32.578125 L 42.332031 31.90625 L 41.171875 31.378906 L 39.710938 30.707031 L 38.550781 30.179688 L 37.066406 29.507812 L 35.625 28.859375 L 34.160156 28.1875 L 32.699219 27.515625 L 31.195312 26.824219 Z M 31.15625 26.804688 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(22.352941%,22.352941%,22.352941%);fill-opacity:1;" d="M 17.925781 32.800781 C 18.011719 32.785156 18.09375 32.75 18.167969 32.699219 L 20.382812 31.703125 L 23.332031 30.363281 L 25.363281 29.445312 L 28.105469 28.207031 L 30.035156 27.332031 L 31.175781 26.804688 C 31.167969 26.851562 31.167969 26.902344 31.175781 26.949219 L 31.175781 40.585938 L 31.03125 40.585938 L 29.855469 39.894531 L 17.984375 32.882812 L 17.863281 32.882812 Z M 17.925781 32.800781 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(7.843137%,7.843137%,7.843137%);fill-opacity:1;" d="M 31.214844 40.644531 L 31.214844 26.949219 C 31.207031 26.902344 31.207031 26.851562 31.214844 26.804688 L 32.71875 27.496094 L 34.183594 28.167969 L 35.644531 28.835938 L 37.089844 29.488281 L 38.570312 30.160156 L 39.730469 30.6875 L 41.195312 31.359375 L 42.351562 31.886719 L 43.816406 32.554688 L 44.324219 32.78125 L 42.960938 33.59375 L 31.296875 40.480469 Z M 31.214844 40.644531 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(54.901961%,54.901961%,54.901961%);fill-opacity:1;" d="M 31.195312 53.976562 L 30.949219 53.609375 C 29.957031 52.230469 28.917969 50.828125 27.984375 49.425781 C 26.644531 47.535156 25.28125 45.644531 23.917969 43.734375 L 21.460938 40.257812 L 18.046875 35.441406 L 18.535156 35.726562 L 23.738281 38.816406 L 28.046875 41.355469 L 31.175781 43.207031 L 31.277344 43.207031 L 31.277344 53.976562 Z M 31.195312 53.976562 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(23.529412%,23.529412%,23.137255%);fill-opacity:1;" d="M 31.195312 53.976562 L 31.195312 43.226562 L 34.203125 41.457031 L 44.261719 35.503906 L 44.425781 35.503906 L 44.425781 35.605469 C 41.296875 40.015625 38.164062 44.40625 35.054688 48.816406 C 33.796875 50.5625 32.554688 52.308594 31.316406 54.078125 Z M 31.195312 53.976562 "/></g>';

let allowedPairs = new Map();
allowedPairs.set("xDAI", {
    xgt: ["xdai"],
    xdai: ["xgt", "dai"],
    dai: ["xdai"],
    usd: ["xdai"],
});
allowedPairs.set("ETH", {
    xgt: ["eth"],
    usd: ["dai", "eth"],
    dai: ["xdai"],
    eth: ["xgt"],
});
allowedPairs.set("BSC", {
    xgt: ["bnb"],
    bnb: ["xgt"],
});

let allowedSources = new Map();
allowedSources.set("xDAI", {
    xgt: ["xdai"],
    xdai: ["dai", "xgt", "usd"],
    dai: ["xdai"],
});
allowedSources.set("ETH", {
    xgt: ["eth"],
    eth: ["xgt", "usd"],
    dai: ["usd"],
    xdai: ["dai"],
});
allowedSources.set("BSC", {
    xgt: ["bnb"],
    bnb: ["xgt"],
});
/**
 * Setup the orchestra
 */
async function init(connect) {
    while (
        typeof window.WalletConnectProvider == "undefined" ||
        typeof window.Web3Modal == "undefined" ||
        typeof Authereum == "undefined" ||
        typeof Web3 == "undefined"
    ) {
        await sleep(75);
    }

    Web3Modal = window.Web3Modal.default;
    WalletConnectProvider = window.WalletConnectProvider.default;
    authereum = Authereum;

    if (location.protocol !== "https:") {
        return;
    }

    if (!$(".web3modal-provider-container:contains('RECOMMENDED')").length) {
        $(".web3modal-provider-name:contains('Torus')")
            .parent()
            .prepend("<strong>RECOMMENDED WALLET</strong><br>");
        // let oldOnClick = $(".web3modal-provider-name:contains('Torus')").parent().parent().onclick;
        $(".web3modal-provider-name:contains('Torus')")
            .parent()
            .parent()
            .on("click", function () {
                showTorusLoader();
                // oldOnClick();
            });
    }
    if (selectedNetwork == "ETH") {
        web3Mainnet = new Web3(
            new Web3.providers.WebsocketProvider(
                "wss://mainnet.infura.io/ws/v3/0a377d98f2ac47fe9dcc44f8ec660256"
            )
        );
    }
    try {
        web3xDai = new Web3(new Web3.providers.HttpProvider(xdaiRpcFallback));
        await web3xDai.eth.getChainId();
    } catch (e) {
        web3xDai = new Web3(new Web3.providers.HttpProvider(xdaiRpcFallback));
        torusHost = xdaiRpcFallback;
    }
    web3bsc = new Web3(new Web3.providers.HttpProvider(bscRpc));

    // await web3bsc.eth.getChainId();
    if (selectedNetwork == "BSC") {
        torusId = parseInt(bscId, 16);
        torusHost = bscRpc;
    }

    let providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: "0a377d98f2ac47fe9dcc44f8ec660256",
            },
        },
        torus: {
            package: Torus,
            display: {
                description: "Sign in or create an account",
            },
            options: {
                networkParams: {
                    host: torusHost, // optional
                    chainId: torusId, // optional
                    networkId: torusId, // optional
                },
                config: {
                    buttonPosition: "bottom-left",
                    showTorusButton: true,
                    enableLogging: false,
                    integrity: {
                        check: false,
                        version: "1.9.19",
                    },
                },
            },
        },
        authereum: {
            package: authereum,
        },
    };

    web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions,
        disableInjectedProvider: false,
    });

    // await $.getJSON("js/abis/XGTStakeMainnet.json", function (json) {
    //     abiXGTStakeMainnet = json;
    // });

    await $.getJSON("js/abis/DAI.json", function (json) {
        abiDAI = json;
    });

    await $.getJSON("js/abis/cDAI.json", function (json) {
        abiCDAI = json;
    });

    await $.getJSON("js/abis/UniswapRouter.json", function (json) {
        abiRouter = json;
    });

    await $.getJSON("js/abis/ERC20.json", function (json) {
        abiXGT = json;
    });

    await $.getJSON("js/abis/Pair.json", function (json) {
        abiPair = json;
    });

    await $.getJSON("js/abis/EIP712.json", function (json) {
        abiEIP712 = json;
    });

    await $.getJSON("js/abis/xDaiHelper.json", function (json) {
        abiXDaiHelper = json;
    });

    await $.getJSON("js/abis/bridge.json", function (json) {
        abiDAIBridgeMainnet = json;
    });

    await $.getJSON("js/abis/Oracle.json", function (json) {
        abiOracle = json;
    });

    await $.getJSON("js/abis/AMBHelper.json", function (json) {
        abiAMBHelper = json;
    });

    await $.getJSON("js/abis/AMBMainnet.json", function (json) {
        abiAMBMainnet = json;
    });

    await $.getJSON("js/abis/RewardChest.json", function (json) {
        abiRewardChest = json;
    });

    await $.getJSON("js/abis/Migrator.json", function (json) {
        abiMigrator = json;
    });

    await $.getJSON("js/abis/ABIBridge.json", function (json) {
        abiBridge = json;
    });

    await $.getJSON("js/abis/PoolModule.json", function (json) {
        abiPoolModule = json;
    });

    await $.getJSON("js/abis/CashbackModule.json", function (json) {
        abiCashbackModule = json;
    });

    await $.getJSON("js/abis/StakingModule.json", function (json) {
        abiStaking = json;
    });

    await $.getJSON("js/abis/StakingPoolv2.json", function (json) {
        abiStakingv2 = json;
    });

    await $.getJSON("js/abis/ABILockStakingPool.json", function (json) {
        abiLockStaking = json;
    });

    await $.getJSON("js/abis/NFTChest.json", function (json) {
        abiNFTChest = json;
    });

    getTVL();
    getCashbackData();
    if (
        localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER") != null ||
        connect
    ) {
        await onConnect();
    } else {
        // await getXGTPrice();
        await getIndependentData();
        if (typeof HelpHero != "undefined") {
            HelpHero.anonymous();
        }
    }
}

async function fetchAccountData() {
    web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    if (
        (selectedAccount == null || !selectedAccount.includes("0x")) &&
        accounts[0] != null &&
        accounts[0] != "0x0000000000000000000000000000000000000000"
    ) {
        selectedAccount = accounts[0];
    } else if (selectedAccount != accounts[0]) {
        selectedAccount = accounts[0];
    }
    await getInfo(true);
    if (typeof HelpHero != "undefined") {
        HelpHero.identify(selectedAccount);
    }

    $("#connect-wallet").text("CONNECTED");
}

async function getCashbackData() {
    if (window.location.href.indexOf("shop") > -1) {
        let poolModule = new web3xDai.eth.Contract(
            abiPoolModule,
            addressPoolModule,
            null
        );

        let cashbackModule = new web3xDai.eth.Contract(
            abiCashbackModule,
            addressCashbackModule,
            null
        );

        let currTVL = await poolModule.methods.getTotalValue().call();
        let readableTVL = parseFloat(
            new Big(currTVL.toString()).div(new Big(10 ** 18))
        ).toFixed(0);

        let currentLevel = await cashbackModule.methods
            .currentCashbackLeft()
            .call();
        switch (currentLevel[0]) {
            case "0":
                updateCashbackLevel(0, (readableTVL / 300000) * 100);
                $("#cashback-unlocked").html("0");
                break;
            case "1":
                readableTVL -= 300000;
                updateCashbackLevel(1, (readableTVL / 200000) * 100);
                $("#cashback-unlocked").html("20");
                break;
            case "2":
                readableTVL -= 500000;
                updateCashbackLevel(2, (readableTVL / 250000) * 100);
                $("#cashback-unlocked").html("40");
                break;
            case "3":
                readableTVL -= 750000;
                updateCashbackLevel(3, (readableTVL / 250000) * 100);
                $("#cashback-unlocked").html("60");
                break;
            case "4":
                readableTVL -= 1000000;
                updateCashbackLevel(4, (readableTVL / 500000) * 100);
                $("#cashback-unlocked").html("80");
                break;
            case "5":
                updateCashbackLevel(5, 100);
                $("#cashback-unlocked").html("100");
                break;
        }
        let leftValue = 0;
        if (currentLevel[0] >= 1) {
            let thisLevelInfo = await cashbackModule.methods
                .getCashbackLevelDetails(1)
                .call();
            leftValue = parseFloat(
                new Big(thisLevelInfo[1].toString())
                    .sub(new Big(thisLevelInfo[2].toString()))
                    .div(new Big(10 ** 18))
            );
        }
        if (currentLevel[0] >= 2) {
            let thisLevelInfo = await cashbackModule.methods
                .getCashbackLevelDetails(2)
                .call();
            leftValue =
                parseFloat(leftValue) +
                parseFloat(
                    new Big(thisLevelInfo[1].toString())
                        .sub(new Big(thisLevelInfo[2].toString()))
                        .div(new Big(10 ** 18))
                );
        }
        if (currentLevel[0] >= 3) {
            let thisLevelInfo = await cashbackModule.methods
                .getCashbackLevelDetails(3)
                .call();
            leftValue =
                parseFloat(leftValue) +
                parseFloat(
                    new Big(thisLevelInfo[1].toString())
                        .sub(new Big(thisLevelInfo[2].toString()))
                        .div(new Big(10 ** 18))
                );
        }
        if (currentLevel[0] >= 4) {
            let thisLevelInfo = await cashbackModule.methods
                .getCashbackLevelDetails(4)
                .call();
            leftValue =
                parseFloat(leftValue) +
                parseFloat(
                    new Big(thisLevelInfo[1].toString())
                        .sub(new Big(thisLevelInfo[2].toString()))
                        .div(new Big(10 ** 18))
                );
        }
        if (currentLevel[0] >= 5) {
            let thisLevelInfo = await cashbackModule.methods
                .getCashbackLevelDetails(5)
                .call();
            leftValue =
                parseFloat(leftValue) +
                parseFloat(
                    new Big(thisLevelInfo[1].toString())
                        .sub(new Big(thisLevelInfo[2].toString()))
                        .div(new Big(10 ** 18))
                );
        }

        $("#cashback-left").html(
            Number(parseFloat(leftValue).toFixed(0)).toLocaleString("en-US")
        );
    }
}

async function getIndependentData() {
    while (typeof latestInfo == "undefined") {
        await sleep(30);
    }

    let APY_POOL = 40;
    let APY_FARM = 40;

    // Set EARN reward displayed staking APY
    if ($("#rewards_week_interest").length) {
        $("#rewards_week_interest").removeClass("pulsing");
        $("#rewards_week_interest").html(APY_POOL.toFixed(0) + " %");
    }

    // Set LP reward displayed staking APY
    if ($("#rewards_week").length) {
        $("#rewards_week").removeClass("pulsing");
        $("#rewards_week").html(APY_FARM + " %");
    }

    let pairContract = new web3xDai.eth.Contract(abiPair, addressPair, null);
    let res;
    let reserveXDAI = "0";
    try {
        res = await pairContract.methods.getReserves().call();
        if (new Big(res["1"]).gt(new Big(res["0"]))) {
            reserveXDAI = res["0"];
        } else {
            reserveXDAI = res["1"];
        }
    } catch (e) {
        console.log(e);
    }

    lpReserve = reserveXDAI;

    lpAPM = parseFloat(APY_FARM) / 100 / 12;

    VALUES_LOADED = true;
    $(".preloader").hide();
    await getCurrentRatio();
}

async function refreshBalance(afterLPChange) {
    if (afterLPChange) {
        $("#earnings-wrapper").addClass("pulsing");
        while (lastLPValue == lpValue) {
            await getLPValue();
            if (lastLPValue == lpValue) {
                await sleep(750);
            }
        }
        $("#earnings-wrapper").removeClass("pulsing");
    }
    // if (selectedAccount == null) {
    //     console.log("Refreshing wallet address")
    //     await fetchAccountData()
    // }
    // let daiContract = new web3Mainnet.eth.Contract(
    //     abiDAI,
    //     addressDAI,
    //     null
    // );
    // let balanceDai = await daiContract.methods.balanceOf(selectedAccount).call();
    // gBalanceDAI = parseFloat((new Big(balanceDai.toString()).div(new Big(10 ** decimalsDai))).toFixed(2).toString());
    gBalanceDAI = parseFloat(0).toFixed(2);
    let balanceXDai = await web3xDai.eth.getBalance(selectedAccount);
    gBalanceXDai = parseFloat(
        new Big(balanceXDai.toString())
            .div(new Big(10 ** 18))
            .toFixed(2)
            .toString()
    );

    let balanceBNB = await web3bsc.eth.getBalance(selectedAccount);
    while (bnbPrice <= 0) {
        await sleep(30);
    }
    gBalanceBNB = parseFloat(
        new Big(balanceBNB.toString())
            .div(new Big(10 ** 18))
            .toFixed(5)
            .toString()
    );
    let balanceBNBinUSD = new Big(gBalanceBNB.toString())
        .mul(new Big(bnbPrice))
        .toFixed(2)
        .toString();

    let thisChainBase;
    if (selectedNetwork == "xDAI") {
        thisChainBase = gBalanceXDai;
    } else if (selectedNetwork == "ETH") {
        let balanceETH = await web3Mainnet.eth.getBalance(selectedAccount);
        while (ethPrice <= 0) {
            await sleep(30);
        }
        gBalanceETH = parseFloat(
            new Big(balanceETH.toString())
                .div(new Big(10 ** 18))
                .toFixed(6)
                .toString()
        );
        let balanceETHinUSD = new Big(gBalanceETH.toString())
            .mul(new Big(ethPrice))
            .toFixed(2)
            .toString();

        if (nativeCurrency) {
            thisChainBase = gBalanceETH;
            if (balanceETH < 0.000001) {
                thisChainBase = parseFloat(thisChainBase).toFixed(2);
            }
            if (balanceETH >= 0.00001) {
                thisChainBase = parseFloat(thisChainBase).toFixed(5);
            }
            if (balanceETH >= 0.0001) {
                thisChainBase = parseFloat(thisChainBase).toFixed(4);
            }
            if (balanceETH >= 0.001) {
                thisChainBase = parseFloat(thisChainBase).toFixed(3);
            }
        } else {
            thisChainBase = parseFloat(balanceETHinUSD).toFixed(2);
        }
    } else if (selectedNetwork == "BSC") {
        if (nativeCurrency) {
            thisChainBase = parseFloat(gBalanceBNB);
            if (thisChainBase < 0.0001) {
                thisChainBase = parseFloat(0).toFixed(2);
            }
        } else {
            thisChainBase = parseFloat(balanceBNBinUSD).toFixed(2);
        }
    }

    let xgtContract = new web3xDai.eth.Contract(abiXGT, addressXGT, null);
    // let xgtContractMainnet = new web3Mainnet.eth.Contract(
    //     abiXGT,
    //     addressXGT,
    //     null
    // );
    let xgtContractBSC = new web3bsc.eth.Contract(abiXGT, addressXGTBSC, null);
    let balanceXGT = await xgtContract.methods
        .balanceOf(selectedAccount)
        .call();
    gBalanceXGTXDai = parseFloat(
        new Big(balanceXGT.toString())
            .div(new Big(10 ** 18))
            .toFixed(2)
            .toString()
    );
    // let balanceXGTMainnet = await xgtContractMainnet.methods
    //     .balanceOf(selectedAccount)
    //     .call();
    // gBalanceXGTETH = parseFloat(
    //     new Big(balanceXGTMainnet.toString())
    //         .div(new Big(10 ** 18))
    //         .toFixed(2)
    //         .toString()
    // );
    let balanceXGTBSC = await xgtContractBSC.methods
        .balanceOf(selectedAccount)
        .call();
    gBalanceXGTBSC = parseFloat(
        new Big(balanceXGTBSC.toString())
            .div(new Big(10 ** 18))
            .toFixed(2)
            .toString()
    );

    if (
        $("#provideLiquidityXGT").length &&
        ((gBalanceXGTXDai > 0 && selectedNetwork == "xDAI") ||
            (gBalanceXGTBSC > 0 && selectedNetwork == "BSC"))
    ) {
        $("#xgt").prop("disabled", false);
    }
    let xgtRewardChest = new web3xDai.eth.Contract(
        abiRewardChest,
        addressRewardChest,
        null
    );
    unclaimedXGT = await xgtRewardChest.methods
        .getClaimableBalance(selectedAccount)
        .call({
            from: selectedAccount,
        });

    if ($("#claimXGT").length) {
        let unclaimedXGTClear = parseFloat(
            new Big(unclaimedXGT.toString()).div(new Big(10 ** 18)).toString()
        )
            .toFixed(0)
            .toString();
        if (parseFloat(unclaimedXGTClear) == 0) {
            $("#claim-rewards").prop("disabled", true);
        }
        $("#claimXGT").html(
            parseFloat(
                new Big(unclaimedXGT.toString())
                    .div(new Big(10 ** 18))
                    .toString()
            )
                .toFixed(0)
                .toString()
        );
        if (!$("#claimXGTSpan").is(":visible")) {
            $("#claimXGTSpan").show();
            $("#xgtBalanceSpan").show();
        }
        $("#xgtBalance").html(
            parseFloat(parseFloat(gBalanceXGTXDai) + parseFloat(gBalanceXGTBSC))
                .toFixed(2)
                .toString() + " XGT"
        );
    }

    // let totalXGT = (new Big(balanceXGT.toString()).add(balanceXGTMainnet.toString()).add(balanceXGTBSC.toString()).add(new Big(unclaimedXGT.toString()))).mul(new Big(xgtPrice)).toFixed(0);
    // let totalXGT = (new Big(balanceXGT.toString()).add(balanceXGTMainnet.toString()).add(balanceXGTBSC.toString())).mul(new Big(xgtPrice)).toFixed(0);
    let thisChainXGT;
    if (selectedNetwork == "xDAI") {
        thisChainXGT = balanceXGT;
    } else if (selectedNetwork == "ETH") {
        thisChainXGT = balanceXGTMainnet;
    } else if (selectedNetwork == "BSC") {
        thisChainXGT = balanceXGTBSC;
    }

    let totalXGT = new Big(thisChainXGT.toString())
        .mul(new Big(xgtPrice))
        .toFixed(0);
    if (nativeCurrency) {
        totalXGT = new Big(thisChainXGT.toString()).toFixed(0);
    }

    if (selectedNetwork == "xDAI") {
        $("#currency-name-balance").html("xDAI");
    } else if (selectedNetwork == "ETH") {
        $("#currency-name-balance").html("ETH");
    } else if (selectedNetwork == "BSC") {
        $("#currency-name-balance").html("BNB");
    }
    if (nativeCurrency) {
        $("#balance-currency").html('<i id="balance">0.00</i>');
        $("#xgt-currency").html('<i id="xgt-balance">0.00</i>');
        $("#xgt-currency-shop").html(
            '<b><span id="xgt-balance">0.00</span></b>'
        );
    } else {
        $("#balance-currency").html('$ <i id="balance">0.00</i>');
        $("#xgt-currency").html('$ <i id="xgt-balance">0.00</i>');
        $("#xgt-currency-shop").html(
            '$ <b><span id="xgt-balance">0.00</span></b>'
        );
    }

    $("#xgt-balance").html(
        parseFloat(web3xDai.utils.fromWei(totalXGT.toString())).toFixed(2)
    );
    $("#balance").html(thisChainBase);

    if (!afterLPChange) {
        await getLPValue();
    }
    await getStakeValue();
    if (window.location.href.indexOf("earn") > -1) {
        // setStakeValue();
    } else if (window.location.href.indexOf("farm") > -1) {
        setLPValue();
    } else {
        setAllValues();
    }
    await getIndependentData();

    if (localStorage.getItem("CROSS_CHAIN_SWAP") != null) {
        swapEncodedData = localStorage.getItem("CROSS_CHAIN_SWAP_DATA");
        $("#confirm_cross_chain_pending").addClass("popup_open");
    }
}

async function finishCrossChainSwap() {
    $("#confirm_cross_chain_pending").removeClass("popup_open");
    bridgeStep = 2;
    $("#wait_purpose").html(
        "Waiting for the bridge to sign the transfer...<br>A transaction will pop up any moment, please wait and approve it."
    );
    $("#wait-popup").addClass("popup_open");
    $("#swapPurpose").html("SWAPPED");
    $("#error-target").html("SWAP");
    sendXGTtoBSC_2();
}
async function getXGTPrice() {
    // while (xgtPrice <= 0) {
    //     await sleep(75);
    // }
    // let routerContract = new web3xDai.eth.Contract(abiRouter, addressRouter, null);
    // try {
    //     let rate = await routerContract.methods
    //         .getAmountsOut(web3xDai.utils.toWei("1", "ether"), [addressXGT, addressWETHXDAI])
    //         .call();
    //     xgtPrice = parseFloat(web3xDai.utils.fromWei(rate[1]))
    //     if ($("#xgtPrice").length) {
    //         $("#xgtPrice").html("$" + xgtPrice.toFixed(3).toString())
    //     }
    // } catch (e) {
    //     xgtPrice = parseFloat("0")
    // }
}

async function getInfo(withUser) {
    let oldLatestInfoRequest = latestInfoRequest;

    if (typeof oldLatestInfoRequest == "undefined") {
        oldLatestInfoRequest = 0;
    }
    if (Date.now() - oldLatestInfoRequest <= 2000 && !withUser) {
        return;
    }
    latestInfoRequest = Date.now();
    oldLatestInfoRequest = Date.now();
    let url = "https://xion.finance/api/";
    const data = {
        user: selectedAccount,
    };
    const other_params = {
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
        method: "POST",
    };

    fetch(url, other_params)
        .catch(function (e) {
            console.log("ERROR ON INFO API CALL");
        })
        .then((response) => response.json())
        .catch(function (e) {
            if (e.toString().indexOf("Unexpected token") == -1) {
                console.log("ERROR ON INFO API CALL DECOMP");
            }
        })
        .then((json) => {
            latestInfo = json;
            latestInfoRequest = Date.now();
        });
    while (oldLatestInfoRequest == latestInfoRequest) {
        await sleep(30);
    }

    return;
}

async function getTVL() {
    if (!tvlCheckRunning) {
        while (true == true) {
            tvlCheckRunning = true;

            let oldTVL = tvl;
            let oldXgtPrice = xgtPrice;
            await getInfo();
            while (typeof latestInfo == "undefined") {
                await sleep(30);
            }

            tvl = latestInfo.tvl;
            xgtPrice = latestInfo.xgt_price;
            bnbPrice = latestInfo.bnb_price;
            ethPrice = latestInfo.eth_price;

            if ($("#tvl-bsc").length && oldTVL != tvl) {
                if (oldTVL == 0) {
                    hideTorus();
                }
                $("#tvl-bsc").removeClass("pulsing");
                $("#tvl-honeyswap").removeClass("pulsing");
                $("#tvl-uniswap").removeClass("pulsing");
                // $("#tvl").html("$ 281,610")
                $("#tvl-honeyswap").html(
                    "$ 5,488,807");
                //     +
                //         Number(
                //             parseFloat(
                //                 parseFloat(
                //                     latestInfo.total_pool_value[0] +
                //                         latestInfo.staking_tvl_xdai
                //                 )
                //             ).toFixed(0)
                //         ).toLocaleString("en-US")
                // );
                $("#tvl-bsc").html(
                    "$" +
                        Number(
                            parseFloat(
                                parseFloat(
                                    latestInfo.total_pool_value[1] +
                                        latestInfo.staking_tvl_bsc
                                )
                            ).toFixed(0)
                        ).toLocaleString("en-US")
                );
                // $("#tvl-honeyswap").html("$ -")
                // $("#tvl-uniswap").html("$" + Number(parseFloat(latestInfo.total_pool_value[2] + 3570).toFixed(0)).toLocaleString('en-US'))
                $("#tvl-uniswap").html("$ -");
                // $("#tvl-bsc").html("$" + Number(parseFloat(latestInfo.total_pool_value[3]).toFixed(0)).toLocaleString('en-US'))
                // $("#tvl-bsc").html("$ -")
            }
            if ($("#xgtPriceXDai").length && oldXgtPrice != xgtPrice) {
                $("#xgtPriceXDai").html(
                    "$" + latestInfo.xgt_price_xdai.toFixed(3).toString()
                );
                // $("#xgtPriceXDai").html("$ -")
                $("#xgtPriceBSC").html(
                    "$" + latestInfo.xgt_price_bsc.toFixed(3).toString()
                );
                // $("#xgtPriceBSC").html("$ -")
            }
            if ($("#xgt-price").length) {
                $("#xgt-price").removeClass("pulsing");
                // $("#xgt-price").html("$ -")
                $("#xgt-price").html("$" + latestInfo.xgt_price_bsc.toFixed(2));
            }
            if ($("#market-cap").length && oldXgtPrice != xgtPrice) {
                $("#market-cap").removeClass("pulsing");
                let mcapBSC =
                    latestInfo.circulating_supply_bsc *
                    latestInfo.xgt_price_bsc;
                let mcapXGT =
                    latestInfo.circulating_supply_xdai *
                    latestInfo.xgt_price_xdai;
                $("#market-cap").html(
                    Number(
                        parseFloat(mcapBSC + mcapXGT).toFixed(0)
                    ).toLocaleString("en-US")
                );
            }
            if ($(".app-content-line").length && oldTVL != tvl) {
                let reachedPercent = new Big(tvl)
                    .div(new Big("50000000"))
                    .mul(new Big("100"))
                    .toFixed(0)
                    .toString();
                if (reachedPercent == "0") {
                    reachedPercent = "0.5";
                }
                $(".app-content-line").width(reachedPercent + "%");
            }

            if ($("#amount-volume").length) {
                $("#amount-volume").html(
                    "$" +
                        Number(
                            (
                                parseFloat(latestInfo.total_volume) / 1000000
                            ).toFixed(2)
                        ).toLocaleString("en-US") +
                        "m"
                );
                $("#amount-volume").removeClass("pulsing");

                $("#amount-lpers").html(latestInfo.total_lpers);
                $("#amount-lpers").removeClass("pulsing");

                $("#amount-shoppers").html(5637);
                $("#amount-shoppers").removeClass("pulsing");

                $("#amount-shoppers").html(5637);
                $("#amount-shoppers").removeClass("pulsing");

                let xgtContractxDAI = new web3xDai.eth.Contract(
                    abiDAI,
                    addressXGT,
                    null
                );
                let rewardsRawxDAI = await xgtContractxDAI.methods
                    .balanceOf(addressRewardChest)
                    .call();
                let xgtContractBSC = new web3bsc.eth.Contract(
                    abiDAI,
                    addressXGT,
                    null
                );
                let rewardsRawBSC = await xgtContractBSC.methods
                    .balanceOf("0x9937E2454bEFE975ba1A2C78cc7750083660331e")
                    .call();
                let rewardsNetXDai =
                    450000000 -
                    parseFloat(
                        new Big(rewardsRawxDAI.toString())
                            .div(new Big(10 ** 18))
                            .toFixed(0)
                            .toString()
                    ) -
                    600000 -
                    1300000;
                let rewardsNetBSC =
                    25000000 +
                    1300000 -
                    parseFloat(
                        new Big(rewardsRawBSC.toString())
                            .div(new Big(10 ** 18))
                            .toFixed(0)
                            .toString()
                    );
                let rewardsValue =
                    parseFloat(latestInfo.xgt_price_xdai) * rewardsNetXDai +
                    parseFloat(latestInfo.xgt_price_bsc) * rewardsNetBSC;
                let suffix = "k";
                if (rewardsValue >= 1000000) {
                    rewardsValue = parseFloat(rewardsValue / 1000000).toFixed(
                        2
                    );
                    suffix = "m";
                } else {
                    rewardsValue = parseFloat(rewardsValue / 1000).toFixed(0);
                }

                $("#amount-rewards").html(
                    "$" + Number(rewardsValue).toLocaleString("en-US") + suffix
                );
                $("#amount-rewards").removeClass("pulsing");
            }

            if ($("#claimXGT").length) {
                let unclaimedXGT = 0;
                if (selectedAccount != null) {
                    let xgtRewardChest = new web3xDai.eth.Contract(
                        abiRewardChest,
                        addressRewardChest,
                        null
                    );
                    unclaimedXGT = await xgtRewardChest.methods
                        .getClaimableBalance(selectedAccount)
                        .call({
                            from: selectedAccount,
                        });
                }
                let unclaimedXGTClear = parseFloat(
                    new Big(unclaimedXGT.toString())
                        .div(new Big(10 ** 18))
                        .toString()
                )
                    .toFixed(0)
                    .toString();
                if (parseFloat(unclaimedXGTClear) < 1) {
                    $("#claim-rewards").prop("disabled", true);
                }
                $("#claimXGT").html(
                    parseFloat(
                        new Big(unclaimedXGT.toString())
                            .div(new Big(10 ** 18))
                            .toString()
                    )
                        .toFixed(0)
                        .toString()
                );
                if (!$("#claimXGTSpan").is(":visible")) {
                    $("#claimXGTSpan").show();
                    $("#xgtBalanceSpan").show();
                }
            }
            await sleep(10000);
        }
    }
}

async function getLPValue() {
    let share;
    let xdaiShare;
    let xgtShare;
    let ethShares;
    await getInfo(true);
    while (typeof latestInfo == "undefined") {
        await sleep(30);
    }
    if (selectedAccount == null) {
        lpShares = 0;
        ethShares = 0;
        lpBase = 0;
        xdaiShare = 0;
        lpXGT = 0;
        xgtShare = 0;
        lpValue = 0;
    } else {
        if (selectedNetwork == "xDAI") {
            let pairContract = new web3xDai.eth.Contract(
                abiPair,
                addressPair,
                null
            );

            let userLPTokens = await pairContract.methods
                .balanceOf(selectedAccount)
                .call();
            userLPTokens = parseFloat(
                new Big(userLPTokens.toString())
                    .div(new Big(10 ** 18))
                    .toFixed(2)
                    .toString()
            );

            let pool = parseFloat(
                (userLPTokens * latestInfo.total_pool_value[0]) /
                    latestInfo.total_pool_tokens[0]
            );
            lpValue = parseFloat(pool).toFixed(2);
            share = parseFloat(
                (lpValue / latestInfo.total_pool_value[0]) * 100
            ).toFixed(2);
            lpShares = userLPTokens;

            let xdaiPerLP = parseFloat(
                latestInfo.total_pool_value[0] /
                    latestInfo.total_pool_tokens[0] /
                    2
            );
            lpBase = new Big(parseFloat(userLPTokens * xdaiPerLP))
                .mul(new Big(10 ** 18))
                .toFixed(0);
            lpXGT = new Big(
                parseFloat(
                    (userLPTokens * xdaiPerLP) / latestInfo.xgt_price_xdai
                )
            )
                .mul(new Big(10 ** 18))
                .toFixed(0);
        } else if (selectedNetwork == "ETH") {
            lpValue = parseFloat(0).toFixed(2);
            share = parseFloat(0).toFixed(2);
        } else if (selectedNetwork == "BSC") {
            let pairContract = new web3bsc.eth.Contract(
                abiPair,
                addressPairBSC,
                null
            );

            let userLPTokens = await pairContract.methods
                .balanceOf(selectedAccount)
                .call();
            userLPTokens = parseFloat(
                new Big(userLPTokens.toString())
                    .div(new Big(10 ** 18))
                    .toFixed(2)
                    .toString()
            );
            let pool = parseFloat(
                (userLPTokens * latestInfo.total_pool_value[1]) /
                    latestInfo.total_pool_tokens[1]
            );
            lpValue = parseFloat(pool).toFixed(2);
            share = parseFloat(
                (lpValue / latestInfo.total_pool_value[1]) * 100
            ).toFixed(2);
            lpShares = userLPTokens;

            let bnbPerLP = parseFloat(
                latestInfo.total_pool_value[1] /
                    latestInfo.total_pool_tokens[1] /
                    bnbPrice /
                    2
            );
            lpBase = new Big(parseFloat(userLPTokens * bnbPerLP))
                .mul(new Big(10 ** 18))
                .toFixed(0);
            lpXGT = new Big(
                parseFloat((userLPTokens * bnbPerLP) / latestInfo.xgt_price_bsc)
            )
                .mul(new Big(10 ** 18))
                .toFixed(0);
        }
    }

    if ($("#poolShareSpan").length) {
        if (!$("#poolShareSpan").is(":visible")) {
            $("#poolShareSpan").show();
        }

        if (share == 0 && lpValue > 0) {
            share = "<br><0.01";
        }
        $("#poolShare").html(share + "%");
        if (selectedNetwork == "xDAI") {
            let baseShare = lpValue / 2;
            let thisXGTShare = lpValue / 2 / xgtPrice;
            $("#poolValue").html(
                baseShare +
                    " xDAI + " +
                    parseFloat(thisXGTShare).toFixed(2) +
                    " XGT"
            );
        } else if (selectedNetwork == "ETH") {
            while (ethPrice <= 0) {
                await sleep(30);
            }
            let baseShare = lpValue / 2;
            let thisXGTShare = lpValue / 2 / xgtPrice;
            $("#poolValue").html(
                parseFloat(baseShare / ethPrice).toFixed(5) +
                    " ETH + " +
                    parseFloat(thisXGTShare).toFixed(2) +
                    " XGT"
            );
        } else if (selectedNetwork == "BSC") {
            while (bnbPrice <= 0) {
                await sleep(30);
            }
            let baseShare = lpValue / 2;
            let thisXGTShare = lpValue / 2 / xgtPrice;
            $("#poolValue").html(
                parseFloat(baseShare / bnbPrice).toFixed(5) +
                    " BNB + " +
                    parseFloat(thisXGTShare).toFixed(2) +
                    " XGT"
            );
        }
    }

    // if (ethShares > 0) {
    //     if (!duringMigration) {
    //         $("#connect-success").removeClass("popup_open")
    //         $("#confirm_farm_migrate_1_4").addClass("popup_open");
    //     }
    // }
    //     let res;
    //     let reserveXGT = "0";
    //     let reserveETH = "0";
    //     try {
    //         res = await uniEthPairContract.methods.getReserves().call();
    //         if (new Big(res["1"]).gt(new Big(res["0"]))) {
    //             reserveETH = res["0"];
    //             reserveXGT = res["1"];
    //         } else {
    //             reserveETH = res["1"];
    //             reserveXGT = res["0"];;
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }

    //     let totalSupply = await uniEthPairContract.methods.totalSupply().call();
    //     if (new Big(totalSupply).eq(new Big("0"))) {
    //         lpValue = web3Mainnet.utils.fromWei("0");
    //         return
    //     }
    //     let ethDaiOracle = new web3Mainnet.eth.Contract(abiOracle, oracleEthDai, null);
    //     let latestEthDai = await ethDaiOracle.methods.latestAnswer().call();

    //     let userSupply = await uniEthPairContract.methods.balanceOf(selectedAccount).call();
    //     let share = new Big(reserveETH).mul(new Big(userSupply).div(new Big(totalSupply)));
    //     let uniETHvalue = share.div(latestEthDai.toString()).toString();

    //     // lpValue = (parseFloat(lpValue) + parseFloat(web3xDai.utils.fromWei(new Big(share).mul(new Big(reserveXGT)).mul(xgtPrice).add(new Big(share).mul(new Big(reserveXDAI))).toFixed(0).toString()))).toString();
    //     lpValue = (parseFloat(lpValue) + parseFloat(uniETHvalue)).toString();
    // }
}

function setLPValue() {
    if (isNaN(lpValue)) {
        lpValue = 0;
    }
    $("#earnings").html(parseFloat(lpValue).toFixed(2));
}

async function tokenAnalytics() {
    currentSupply();
}

async function currentSupply() {
    let xgtContract = new web3xDai.eth.Contract(abiDAI, addressXGT, null);
    let mainnetBalance = await xgtContract.methods.balanceOf(addressXGT).call();
    mainnetBalance = new Big(mainnetBalance.toString())
        .div(new Big(10 ** 18))
        .toFixed(0)
        .toString();
    let bscBalance = await xgtContract.methods
        .balanceOf("0x59447362798334d3485c64D1e4870Fde2DDC0d75")
        .call();
    bscBalance = new Big(bscBalance.toString())
        .div(new Big(10 ** 18))
        .toFixed(0)
        .toString();
    let vestingBalance = await xgtContract.methods
        .balanceOf("0x080Dd0D9A441FA76f67A59260229dBce897148a4")
        .call();
    let currentSupply = new Big("3000000000")
        .mul(new Big(10 ** 18))
        .sub(new Big(vestingBalance.toString()))
        .div(new Big(10 ** 18))
        .toFixed(0)
        .toString();
    let mainnetPercent = parseFloat(
        (mainnetBalance * 100) / currentSupply
    ).toFixed(2);
    let bscPercent = parseFloat((bscBalance * 100) / currentSupply).toFixed(2);
    let xdaiPercent = parseFloat(100 - mainnetPercent - bscPercent).toFixed(2);
    console.log("###########################");
    console.log("###########################");
    console.log("CURRENT CIRCULATING SUPPLY TOTAL");
    console.log(Number(currentSupply).toLocaleString("en-US") + " XGT");
    console.log("CURRENT CIRCULATING SUPPLY ON XDAI");
    console.log(
        Number(
            parseFloat(currentSupply - mainnetBalance - bscBalance)
        ).toLocaleString("en-US") +
            " XGT (" +
            xdaiPercent +
            "%)"
    );
    console.log("CURRENT CIRCULATING SUPPLY ON ETH MAINNET");
    console.log(
        Number(parseFloat(mainnetBalance)).toLocaleString("en-US") +
            " XGT (" +
            mainnetPercent +
            "%)"
    );
    console.log("CURRENT CIRCULATING SUPPLY ON BSC");
    console.log(
        Number(parseFloat(bscBalance)).toLocaleString("en-US") +
            " XGT (" +
            bscPercent +
            "%)"
    );
    console.log("###########################");
    console.log("MARKET CAP BASED ON THIS SUPPLY");
    console.log(
        "$" +
            Number(
                parseFloat(currentSupply * xgtPrice).toFixed(0)
            ).toLocaleString("en-US")
    );
    console.log("###########################");
    console.log("XGT PRICE ON XDAI");
    console.log(
        "$" +
            Number(
                parseFloat(latestInfo.xgt_price_xdai).toFixed(4)
            ).toLocaleString("en-US")
    );
    console.log("XGT PRICE ON BSC");
    console.log(
        "$" +
            Number(
                parseFloat(latestInfo.xgt_price_bsc).toFixed(4)
            ).toLocaleString("en-US")
    );
    console.log("XGT PRICE WEIGHTED AVERAGE");
    console.log(
        "$" + Number(parseFloat(xgtPrice).toFixed(4)).toLocaleString("en-US")
    );
    console.log("###########################");
    console.log("###########################");
}

async function communitySupply() {
    let xgtContractXDai = new web3xDai.eth.Contract(abiDAI, addressXGT, null);
    let totalSupply = await xgtContractXDai.methods.totalSupply().call();
    totalSupply = new Big(totalSupply.toString())
        .div(new Big(10 ** 18))
        .toFixed(0);

    // let amounts = ["0x5540ee86e9f11d6670c41e934dfc2ac28fe378e5", "0xe0586c7e94c3a69d06779d6cab7c4cb753c462db", "0x78c346CA61DD8393Fce282adE47ab2299a72c790", "0x4C22Aac7B491cD4314B84bf03D7Fc5D19D30Fc9e", "0xd5f2b87b0a1ae9f89e22bba42628807ff5c1707c"]
    let additional = new Big(0);
    let amounts = [
        "106443",
        "70007",
        "55567",
        "57822",
        "138561",
        "75255",
        "51789",
        "12768",
        "11705",
        "44721",
    ];
    for (let amount of amounts) {
        additional = additional.add(new Big(amount));
    }
    let gnosisSupply = await xgtContractXDai.methods
        .balanceOf("0x7418Eb337cF87AF223d07A857387c1F8E7942Ae6")
        .call();
    gnosisSupply = new Big(gnosisSupply.toString())
        .div(new Big(10 ** 18))
        .toFixed(0);
    let diff = new Big(totalSupply).sub(gnosisSupply).sub(additional);
    console.log("###########################");
    console.log("CIRCULATING SUPPLY WITHOUT VESTED ETC.");
    console.log("###########################");
    console.log(diff.toString() + " XGT");
    console.log(
        "$" +
            Number(
                parseFloat(parseFloat(diff.toString()) * xgtPrice).toFixed(0)
            ).toLocaleString("en-US")
    );
    console.log("###########################");
}

async function getCurrentRatio() {
    let pairContract = new web3xDai.eth.Contract(abiPair, addressPair, null);
    let res = await pairContract.methods.getReserves().call();
    let reserveXGT, reserveXDAI;
    if (new Big(res["1"]).gt(new Big(res["0"]))) {
        reserveXDAI = res["0"];
        reserveXGT = res["1"];
    } else {
        reserveXDAI = res["1"];
        reserveXGT = res["0"];
    }
    if (new Big(reserveXGT).eq(new Big("0"))) {
        lpRatio = new Big("0.02");
        return;
    }
    lpRatioXDAI = new Big(reserveXDAI).div(new Big(reserveXGT));

    // let pairContractETH = new web3Mainnet.eth.Contract(
    //     abiPair,
    //     addressPairUniETH,
    //     null
    // );
    // let resETH = await pairContractETH.methods.getReserves().call();
    // let reserveXGTonETH, reserveETH;
    // if (new Big(resETH["1"]).gt(new Big(resETH["0"]))) {
    //     reserveETH = resETH["0"];
    //     reserveXGTonETH = resETH["1"];
    // } else {
    //     reserveETH = resETH["1"];
    //     reserveXGTonETH = resETH["0"];
    // }
    // lpRatioETH = new Big(reserveETH).div(new Big(reserveXGTonETH));

    let pairContractBSC = new web3bsc.eth.Contract(
        abiPair,
        addressPairBSC,
        null
    );
    let resBSC = await pairContractBSC.methods.getReserves().call();
    let reserveXGTonBSC, reserveBNB;
    if (new Big(resBSC["1"]).gt(new Big(resBSC["0"]))) {
        reserveBNB = resBSC["0"];
        reserveXGTonBSC = resBSC["1"];
    } else {
        reserveBNB = resBSC["1"];
        reserveXGTonBSC = resBSC["0"];
    }
    lpRatioBSC = new Big(reserveBNB).div(new Big(reserveXGTonBSC));
}

async function getStakeValue() {
    let stakeContract;
    let value;
    let rawXGT = 0;
    if (selectedNetwork == "xDAI") {
        stakeContract = new web3xDai.eth.Contract(
            abiStaking,
            addressXGTStakeXDai,
            null
        );
        let xgtEarned = await stakeContract.methods
            .getCurrentUserBalance(selectedAccount)
            .call();
        rawXGT = parseFloat(
            new Big(xgtEarned.toString())
                .div(new Big(10 ** 18))
                .toFixed(2)
                .toString()
        );
        value = rawXGT * xgtPrice;
    } else if ((selectedNetwork = "BSC")) {
        stakeContract = new web3bsc.eth.Contract(
            abiStaking,
            addressXGTStakeBSC,
            null
        );
        let xgtEarned = await stakeContract.methods
            .getCurrentUserBalance(selectedAccount)
            .call();
        rawXGT = parseFloat(
            new Big(xgtEarned.toString())
                .div(new Big(10 ** 18))
                .toFixed(2)
                .toString()
        );
        value = rawXGT * xgtPrice;
    } else {
        value = 0;
    }

    stakeValue = parseFloat(value).toFixed(2).toString();

    if ($("#earnSpan").length) {
        if (!$("#earnSpan").is(":visible")) {
            $("#earnSpan").show();
        }
        $("#earnValue").html(rawXGT.toFixed(2).toString() + " XGT");
    }
    if (window.location.href.indexOf("earn") > -1) {
        setStakeValue();
    }
}

function setStakeValue() {
    $("#earnings").html(parseFloat(stakeValue).toFixed(2));
}

async function setAllValues() {
    let setValue = parseFloat(stakeValue) + parseFloat(lpValue);
    $("#earnings").html(parseFloat(setValue).toFixed(2));
}

async function refreshAccountData() {
    document
        .querySelector("#connect-wallet")
        .setAttribute("disabled", "disabled");
    await fetchAccountData();
    document.querySelector("#connect-wallet").removeAttribute("disabled");
}

async function waitForSwitch(id, purpose) {
    if (typeof web3 == "undefined") {
        return false;
    }
    if (web3Modal.providerController.cachedProvider == "torus") {
        if (torusId == parseInt(id, 16)) {
            return true;
        }
        $(".preloader").show();
        await onDisconnect();
        if (id == mainnetId) {
            torusId = parseInt(mainnetId, 16);
            torusHost = mainnetRpc;
        } else if (id == xdaiId) {
            torusId = parseInt(xdaiId, 16);
            torusHost = xdaiRpcFallback;
        } else {
            torusId = parseInt(bscId, 16);
            torusHost = "bsc_mainnet";
        }
        await init(false);
        $(".preloader").hide();
        return true;
    }
    let currentIDTemp = await web3.eth.getChainId();
    let currentID = currentIDTemp.toString(16);
    if (currentID != id) {
        $("#network-notification").addClass("active");
        $("#network-switch-purpose").html(purpose);
        if (id == xdaiId) {
            $("#network-switch-to").html(xdai);
            window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        chainId: "0x64",
                        chainName: "Gnosis Chain",
                        nativeCurrency: {
                            name: "xDAI",
                            symbol: "xDAI",
                            decimals: 18,
                        },
                        rpcUrls: ["https://rpc.gnosischain.com/"],
                        blockExplorerUrls: ["https://gnosisscan.io/"],
                    },
                ],
            });
        } else if (id == mainnetId) {
            $("#network-switch-to").html(mainnet);
        } else {
            $("#network-switch-to").html(bsc);
            window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        chainId: "0x38",
                        chainName: "Binance Smart Chain",
                        nativeCurrency: {
                            name: "BNB",
                            symbol: "BNB",
                            decimals: 18,
                        },
                        rpcUrls: [
                            "https://nameless-empty-meadow.bsc.quiknode.pro/f10040924617f9a0fbd0d0f5f6424b8cc4fa74e4/",
                        ],
                        blockExplorerUrls: ["https://bscscan.com/"],
                    },
                ],
            });
        }

        while (currentID != id) {
            let currentIDTemp = await web3.eth.getChainId();
            currentID = currentIDTemp.toString(16);
            await sleep(500);
        }
        $("#network-notification").removeClass("active");
    }
    return true;
}

async function startEarning() {
    if (
        $("#earn-input").val() == "" ||
        parseFloat($("#earn-input").val()) == 0
    ) {
        return;
    }
    if ($("#earn-input").hasClass("redInput")) {
        $("#error-popup-money-earn").addClass("popup_open");
        return;
    }
    await checkConnected();
    let id;
    let stakingAddress;
    if (selectedNetwork == "xDAI") {
        id = xdaiId;
        stakingAddress = addressXGTStakeXDai;
    } else if (selectedNetwork == "BSC") {
        id = bscId;
        stakingAddress = addressXGTStakeBSC;
    } else {
        return;
    }
    let networkOk = await waitForSwitch(id, "earn");
    if (!networkOk) {
        return;
    }
    let amount = web3.utils.toWei(
        new Big($("#earn-input").val()).toFixed(10).toString(),
        "ether"
    );
    let xgtContract = new web3.eth.Contract(abiXGT, addressXGT, null);
    $('strong[id^="earn-dai-amount"]').html($("#earn-input").val());
    let total = parseFloat(parseFloat($("#earn-input").val())).toFixed(2);
    $('strong[id^="earn-total"]').html(total);
    $('strong[id^="earn-fee"]').html("<0.01");

    let allowance = await xgtContract.methods
        .allowance(selectedAccount, stakingAddress)
        .call();
    if (new Big(allowance).mul(new Big(10 ** 18)).lt(new Big(amount))) {
        $("#confirm_approval").addClass("popup_open");
    } else {
        $("#confirm_earn_1").addClass("popup_open");
    }
}

async function earn_Approve() {
    await checkConnected();
    let id;
    let stakingAddress;
    if (selectedNetwork == "xDAI") {
        id = xdaiId;
        stakingAddress = addressXGTStakeXDai;
    } else if (selectedNetwork == "BSC") {
        id = bscId;
        stakingAddress = addressXGTStakeBSC;
    } else {
        return;
    }
    let networkOk = await waitForSwitch(id, "earn");
    if (!networkOk) {
        return;
    }
    let amount = new Big(
        web3.utils.toWei($("#earn-input").val(), "ether").toString()
    );
    amount = amount.toFixed(0);
    $("#confirm_approval").removeClass("popup_open");
    $("#wait_purpose").html(
        "Waiting for the approval transaction to finish..."
    );
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("EARNING");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        earn_Approve();
    });
    refreshBalance();

    let xgtContract = new web3.eth.Contract(abiXGT, addressXGT, null);
    try {
        let xgtBalance = 0;
        if (selectedNetwork == "xDAI") {
            xgtBalance = gBalanceXGTXDai;
        } else if (selectedNetwork == "BSC") {
            xgtBalance = gBalanceXGTBSC;
        }
        let txReturn;
        if (
            parseFloat(xgtBalance - parseFloat($("#earn-input").val())) <= 0.8
        ) {
            amount = await xgtContract.methods
                .balanceOf(selectedAccount)
                .call();
        }
        txReturn = await xgtContract.methods
            .approve(stakingAddress, uint256Max)
            .send({
                from: selectedAccount,
            });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('strong[id^="earn-fee"]').html("0.00");
            $("#confirm_earn_2").addClass("popup_open");
            return;
        } else {
            $("#error-popup").addClass("popup_open");
            return;
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e);
    }
    $("#wait-popup").removeClass("popup_open");
}

async function daiPermitEarn(spenderAddress) {
    let daiContract = new web3.eth.Contract(abiDAI, addressDAI, null);
    const message = {
        holder: selectedAccount,
        spender: spenderAddress,
        nonce: parseInt(
            (
                await daiContract.methods.nonces(selectedAccount).call()
            ).toString()
        ),
        expiry: Math.round(new Date().getTime() / 1000) + 60 * 60,
        allowed: true,
    };
    const typedData = JSON.stringify({
        types: {
            EIP712Domain: [
                {
                    name: "name",
                    type: "string",
                },
                {
                    name: "version",
                    type: "string",
                },
                {
                    name: "chainId",
                    type: "uint256",
                },
                {
                    name: "verifyingContract",
                    type: "address",
                },
            ],
            Permit: [
                {
                    name: "holder",
                    type: "address",
                },
                {
                    name: "spender",
                    type: "address",
                },
                {
                    name: "nonce",
                    type: "uint256",
                },
                {
                    name: "expiry",
                    type: "uint256",
                },
                {
                    name: "allowed",
                    type: "bool",
                },
            ],
        },
        primaryType: "Permit",
        domain: {
            name: "Dai Stablecoin",
            version: "1",
            chainId: 1,
            verifyingContract: addressDAI,
        },
        message: message,
    });

    await web3.currentProvider.send(
        {
            jsonrpc: "2.0",
            id: 999999999999,
            method: "eth_signTypedData_v4",
            params: [selectedAccount, typedData],
        },
        function (error, response) {
            if (error || (response && response.error)) {
                console.log(error);
                $("#wait-popup").removeClass("popup_open");
                $("#error-popup").addClass("popup_open");
            } else if (response && response.result) {
                const r = response.result.slice(0, 66);
                const s = "0x" + response.result.slice(66, 130);
                const v = "0x" + response.result.slice(130, 132);
                const url = permitTxAPI;
                const data = {
                    Holder: message.holder,
                    Spender: message.spender,
                    Nonce: message.nonce,
                    Expiry: message.expiry,
                    Allowed: message.allowed,
                    SigR: r,
                    SigS: s,
                    SigV: v,
                };
                const other_params = {
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(data),
                    method: "POST",
                };
                fetch(url, other_params)
                    .catch(function () {
                        $("#wait-popup").removeClass("popup_open");
                        $("#error-popup").addClass("popup_open");
                        return Promise.reject();
                    })
                    .then((response) => response.json())
                    .catch(function () {
                        $("#wait-popup").removeClass("popup_open");
                        $("#error-popup").addClass("popup_open");
                        return Promise.reject();
                    })
                    .then((json) => {
                        if (json.Status == "ok") {
                            $("#wait-popup").removeClass("popup_open");
                            $('strong[id^="earn-total"]').html("0.00");
                            $('strong[id^="earn-fee"]').html("0.00");
                            $("#confirm_earn_2").addClass("popup_open");
                            return;
                        } else {
                            $("#wait-popup").removeClass("popup_open");
                            $("#error-popup").addClass("popup_open");
                            return;
                        }
                    });
            }
        }
    );
}

async function earn_Final() {
    refreshBalance();
    let amount = new Big(
        web3.utils.toWei($("#earn-input").val(), "ether").toString()
    );
    amount = amount.toFixed(0);

    let txUrl;
    let stakingAddress;
    if (selectedNetwork == "xDAI") {
        stakingAddress = addressXGTStakeXDai;
        txUrl = txUrlXDai;
    } else if (selectedNetwork == "BSC") {
        stakingAddress = addressXGTStakeBSC;
        txUrl = txUrlBSC;
    } else {
        return;
    }

    let stakingContract = new web3.eth.Contract(
        abiStaking,
        stakingAddress,
        null
    );

    $("#confirm_earn_1").removeClass("popup_open");
    $("#confirm_earn_2").removeClass("popup_open");
    $("#wait_purpose").html("Waiting for the earn transaction to finish...");
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("EARNING");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        earn_Final();
    });

    try {
        let xgtBalance = 0;
        if (selectedNetwork == "xDAI") {
            xgtBalance = gBalanceXGTXDai;
        } else if (selectedNetwork == "BSC") {
            xgtBalance = gBalanceXGTBSC;
        }
        if (
            parseFloat(xgtBalance - parseFloat($("#earn-input").val())) <= 0.8
        ) {
            let xgtContract = new web3.eth.Contract(abiXGT, addressXGT, null);
            amount = await xgtContract.methods
                .balanceOf(selectedAccount)
                .call();
        }
        let txReturn = await stakingContract.methods
            .deposit(amount.toString())
            .send({
                from: selectedAccount,
            });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrl + txReturn.transactionHash, "_blank");
            });
            $("#earn-success").addClass("popup_open");
            refreshBalance();
            return;
        } else {
            $("#error-popup").addClass("popup_open");
            return;
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e);
    }
    $("#wait-popup").removeClass("popup_open");
}

async function migrateXDai() {
    await checkConnected();
    let networkOk = await waitForSwitch(xdaiId, "migrate");
    if (!networkOk) {
        return;
    }
    $("#confirm_xdai_migrate").removeClass("popup_open");

    $("#wait_purpose").html(
        "Waiting for the migration transaction to finish..."
    );
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("MIGRATION");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        migrateXDai();
    });

    let migrationContract = new web3.eth.Contract(
        abiMigrator,
        "0xC61Db94009CEfeD57cfa1d9A79BcC8B010538e11",
        null
    );
    try {
        let txReturn = await migrationContract.methods.migrate().send({
            from: selectedAccount,
        });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $("#migration-success").addClass("popup_open");
            refreshBalance();
            return;
        } else {
            $("#error-popup").addClass("popup_open");
            return;
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e);
    }
    $("#wait-popup").removeClass("popup_open");
}

async function provideLiquidity() {
    // return
    if (
        $("#provideLiquidityXDai").hasClass("redInput") ||
        $("#provideLiquidityXGT").hasClass("redInput")
    ) {
        $("#error-popup-money-farm").addClass("popup_open");
        return;
    }
    await checkConnected();
    let targetID = xdaiId;
    let lpRatio = lpRatioXDAI;
    let maxNative = gBalanceXDai;
    let gasDeduct = 0.01;
    let thisAddressXGT = addressXGT;
    let basePrice = 1;
    if (selectedNetwork == "ETH") {
        targetID = mainnetId;
        lpRatio = lpRatioETH;
        maxNative = gBalanceETH;
        gasDeduct = 0.025;
        basePrice = ethPrice;
    } else if (selectedNetwork == "BSC") {
        targetID = bscId;
        lpRatio = lpRatioBSC;
        maxNative = gBalanceBNB;
        gasDeduct = 0.015;
        thisAddressXGT = addressXGTBSC;
        basePrice = bnbPrice;
    }
    let networkOk = await waitForSwitch(targetID, "farm");
    if (!networkOk) {
        return;
    }
    let xgtAmount, xdaiAmount;
    let xgtContract = new web3.eth.Contract(abiDAI, thisAddressXGT, null);
    if ($("#xgt").is(":checked")) {
        if ($("#provideLiquidityXDai").val() == "") {
            return;
        }
        if (
            $("#provideLiquidityXGT").val() == "" ||
            $("#provideLiquidityXGT").val() == 0
        ) {
            xgtAmount = web3.utils.toWei(
                new Big($("#provideLiquidityXDai").val())
                    .div(new Big(lpRatio))
                    .toFixed(10)
                    .toString(),
                "ether"
            );
        } else {
            xgtAmount = web3.utils.toWei(
                new Big($("#provideLiquidityXGT").val()).toFixed(10).toString(),
                "ether"
            );
        }
        halfXGTAmount = xgtAmount;
        if (maxNative <= $("#swapLeft").val()) {
            $("#swapLeft").val(
                parseFloat(
                    parseFloat($("#swapLeft").val()) - gasDeduct
                ).toFixed(2)
            );
        }

        xdaiAmount = web3.utils.toWei(
            new Big($("#provideLiquidityXDai").val()).toFixed(10).toString(),
            "ether"
        );
        if (
            new Big(xgtAmount).eq(new Big(0)) ||
            new Big(xdaiAmount).eq(new Big(0))
        ) {
            return;
        }
        if (selectedNetwork == "xDAI") {
            $('strong[id^="farm-xdai-amount"]').html(
                $("#provideLiquidityXDai").val() + " xDAI"
            );
        } else {
            $('strong[id^="farm-xdai-amount"]').html(
                $("#provideLiquidityXDai").val() + " BNB"
            );
        }
        $('strong[id^="farm-xgt-amount"]').html(
            $("#provideLiquidityXGT").val()
        );
        let total = parseFloat(
            parseFloat($("#provideLiquidityXGT").val()) * xgtPrice +
                parseFloat($("#provideLiquidityXDai").val()) * basePrice
        ).toFixed(2);
        $('strong[id^="farm-total"]').html(total);
    } else {
        if ($("#provideLiquidityXDai").val() == "") {
            return;
        }
        xdaiAmount = web3.utils.toWei(
            new Big($("#provideLiquidityXDai").val()).toFixed(10).toString(),
            "ether"
        );
        if (new Big(xdaiAmount).eq(new Big(0))) {
            return;
        }

        if (selectedNetwork == "xDAI") {
            $('strong[id^="farm-xdai-amount"]').html(
                parseFloat(
                    parseFloat($("#provideLiquidityXDai").val()) / 2
                ).toFixed(2) + " xDAI"
            );
        } else {
            $('strong[id^="farm-xdai-amount"]').html(
                parseFloat(
                    parseFloat($("#provideLiquidityXDai").val()) / 2
                ).toFixed(2) + " BNB"
            );
        }
        $('strong[id^="farm-xgt-amount"]').html(
            parseFloat(
                parseFloat(parseFloat($("#provideLiquidityXDai").val()) / 2) /
                    xgtPrice
            ).toFixed(0)
        );
        $('strong[id^="farm-total"]').html($("#provideLiquidityXDai").val());
    }
    $('strong[id^="farm-fee"]').html("<0.01");
    if ($("#xgt").is(":checked")) {
        let allowance = await xgtContract.methods
            .allowance(selectedAccount, addressRouter)
            .call();

        if (new Big(allowance).lt(new Big(xgtAmount))) {
            $("#confirm_approval").addClass("popup_open");
        } else {
            $("#confirm_farm_1").addClass("popup_open");
        }
    } else {
        $("#confirm_farm_1_3").addClass("popup_open");
    }
}

async function provideLiquidity_Approve(overriding) {
    $("#confirm_approval").removeClass("popup_open");
    $("#confirm_farm_1_3").removeClass("popup_open");
    $("#confirm_farm_2_3").removeClass("popup_open");
    $("#wait_purpose").html(
        "Waiting for the approval transaction to finish..."
    );
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("FARMING");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        provideLiquidity_Approve();
    });
    refreshBalance();
    let thisAddressXGT = addressXGT;
    let router = addressRouter;
    let path = [addressWETHXDAI, thisAddressXGT];
    if (selectedNetwork == "ETH") {
        router = addressRouterETH;
        path = [addressWETHETH, thisAddressXGT];
    } else if (selectedNetwork == "BSC") {
        thisAddressXGT = addressXGTBSC;
        router = addressRouterBSC;
        path = [addressWETHBSC, thisAddressXGT];
    }
    if ($("#xgt").is(":checked") || overriding) {
        let xgtAmount = halfXGTAmount.toString();
        let xgtContract = new web3.eth.Contract(abiDAI, thisAddressXGT, null);
        let currentAllowance = await xgtContract.methods
            .allowance(selectedAccount, router)
            .call();
        if (
            new Big(currentAllowance.toString()).gte(
                new Big(xgtAmount.toString())
            )
        ) {
            $("#wait-popup").removeClass("popup_open");
            $('strong[id^="farm-total"]').html("0.00");
            $('strong[id^="farm-fee"]').html("0.00");
            if ($("#xgt").is(":checked")) {
                $("#confirm_farm_2").addClass("popup_open");
            } else {
                $("#confirm_farm_3_3").addClass("popup_open");
            }
            return;
        }
        try {
            let txReturn = await xgtContract.methods
                .approve(router, uint256Max)
                .send({
                    from: selectedAccount,
                });
            $("#wait-popup").removeClass("popup_open");
            if (txReturn.status) {
                $('strong[id^="farm-total"]').html("0.00");
                $('strong[id^="farm-fee"]').html("0.00");
                if ($("#xgt").is(":checked")) {
                    $("#confirm_farm_2").addClass("popup_open");
                } else {
                    $("#confirm_farm_3_3").addClass("popup_open");
                }
                return;
            } else {
                $("#error-popup").addClass("popup_open");
            }
        } catch (e) {
            $("#error-popup").addClass("popup_open");
            console.log(e);
        }
    } else {
        let routerContract = new web3.eth.Contract(abiRouter, router, null);
        let xgtContract = new web3.eth.Contract(abiXGT, thisAddressXGT, null);
        let xdaiAmount = new Big($("#provideLiquidityXDai").val())
            .mul(new Big(0.995 / 2))
            .mul(new Big(10 ** 18))
            .toFixed(0)
            .toString();
        let rate = await routerContract.methods
            .getAmountsOut(xdaiAmount, path)
            .call();
        let xgtRate = new Big(rate[1].toString())
            .mul(new Big("0.98"))
            .toFixed(0)
            .toString();
        let balanceBefore = await xgtContract.methods
            .balanceOf(selectedAccount)
            .call();
        try {
            let txReturn = await routerContract.methods
                .swapExactETHForTokens(
                    xgtRate,
                    path,
                    selectedAccount,
                    Math.round(new Date().getTime() / 1000) + 60 * 60
                )
                .send({
                    from: selectedAccount,
                    value: xdaiAmount,
                });
            let balanceAfter = balanceBefore;
            while (
                new Big(balanceAfter.toString())
                    .sub(new Big(balanceBefore.toString()))
                    .lte(new Big(0))
            ) {
                balanceAfter = await xgtContract.methods
                    .balanceOf(selectedAccount)
                    .call();
                await sleep(500);
            }
            halfXGTAmount = new Big(balanceAfter.toString())
                .sub(new Big(balanceBefore.toString()))
                .toFixed(0);
            let currentAllowance = await xgtContract.methods
                .allowance(selectedAccount, addressRouter)
                .call();
            $("#wait-popup").removeClass("popup_open");
            if (txReturn.status) {
                $('strong[id^="farm-total"]').html("0.00");
                $('strong[id^="farm-fee"]').html("0.00");
                if (
                    new Big(currentAllowance.toString()).gte(
                        new Big(halfXGTAmount.toString())
                    )
                ) {
                    $("#confirm_farm_3_3").addClass("popup_open");
                } else {
                    $("#confirm_farm_2_3").addClass("popup_open");
                }
                return;
            } else {
                $("#error-popup").addClass("popup_open");
            }
        } catch (e) {
            $("#error-popup").addClass("popup_open");
            console.log(e);
        }
    }
    $("#wait-popup").removeClass("popup_open");
}

async function provideLiquidity_Final() {
    $("#confirm_farm_1").removeClass("popup_open");
    $("#confirm_farm_2").removeClass("popup_open");
    $("#confirm_farm_3_3").removeClass("popup_open");
    $("#wait_purpose").html("Waiting for the farm transaction to finish...");
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("FARMING");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        provideLiquidity_Final();
    });
    refreshBalance();
    let baseAmount;
    let xgtAmount = halfXGTAmount.toString();
    if ($("#xgt").is(":checked")) {
        baseAmount = web3.utils.toWei(
            parseFloat(parseFloat($("#provideLiquidityXDai").val()))
                .toFixed(10)
                .toString(),
            "ether"
        );
        // xgtAmount = web3.utils.toWei(new Big($("#provideLiquidityXDai").val()).div(new Big(lpRatio)).toFixed(10).toString(), "ether");
        // xgtMin = new Big(xgtAmount.toString()).mul(new Big(1 - parseFloat($("#slippage").val()) / 100)).toFixed(0).toString()
        // xdaiMin = new Big(baseAmount.toString()).mul(new Big(1 - parseFloat($("#slippage").val()) / 100)).toFixed(0).toString()
    } else {
        baseAmount = new Big($("#provideLiquidityXDai").val())
            .mul(new Big(0.495))
            .mul(new Big(10 ** 18))
            .toFixed(0)
            .toString();
    }

    let xgtMin = new Big(xgtAmount.toString()).mul(0.8).toFixed(0).toString();
    let xdaiMin = new Big(baseAmount.toString()).mul(0.8).toFixed(0).toString();

    let thisAddressXGT = addressXGT;
    let router = addressRouter;
    let txUrl = txUrlXDai;
    if (selectedNetwork == "ETH") {
        router = addressRouterETH;
        txUrl = txUrlMainnet;
    } else if (selectedNetwork == "BSC") {
        thisAddressXGT = addressXGTBSC;
        router = addressRouterBSC;
        txUrl = txUrlBSC;
    }

    let xgtContract = new web3.eth.Contract(abiXGT, thisAddressXGT, null);
    let balance = await xgtContract.methods.balanceOf(selectedAccount).call();
    if (new Big(balance.toString()).lt(new Big(xgtAmount.toString()))) {
        xgtAmount = balance;
        xgtMin = new Big(xgtAmount.toString()).mul(0.25).toFixed(0).toString();
        xdaiMin = new Big(baseAmount.toString())
            .mul(0.25)
            .toFixed(0)
            .toString();
    }

    let balanceBase = await web3.eth.getBalance(selectedAccount);
    if (new Big(balanceBase.toString()).lte(new Big(baseAmount.toString()))) {
        if (new Big(balanceBase.toString()).lte(new Big(1.5 * 10 ** 16))) {
            $("#error-popup").addClass("popup_open");
            return;
        }
        baseAmount = new Big(balanceBase.toString())
            .sub(1.5 * 10 ** 16)
            .toFixed(0)
            .toString();
        xgtMin = new Big(xgtAmount.toString()).mul(0.25).toFixed(0).toString();
        xdaiMin = new Big(baseAmount.toString())
            .mul(0.25)
            .toFixed(0)
            .toString();
    }

    if ($("#xgt").is(":checked")) {
        xdaiMin = new Big(xdaiMin.toString()).mul(0.7).toFixed(0).toString();
        xgtMin = new Big(xgtMin.toString()).mul(0.7).toFixed(0).toString();
    }

    lastLPValue = lpValue;
    let routerContract = new web3.eth.Contract(abiRouter, router, null);
    try {
        let txReturn = await routerContract.methods
            .addLiquidityETH(
                thisAddressXGT,
                xgtAmount,
                xgtMin,
                xdaiMin,
                selectedAccount,
                Math.round(new Date().getTime() / 1000) + 60 * 60
            )
            .send({
                from: selectedAccount,
                value: baseAmount,
            });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrl + txReturn.transactionHash, "_blank");
            });
            $("#farm-success").addClass("popup_open");
            refreshBalance(true);
            return;
        } else {
            $("#error-popup").addClass("popup_open");
            return;
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e);
    }
    $("#wait-popup").removeClass("popup_open");
}
async function withdraw() {
    await checkConnected();
    let amount = parseFloat($("#withdraw-input").val()).toFixed(2);
    if (amount == 0 || isNaN(amount)) {
        return;
    }
    $("#advanced1").hide();
    $("#advanced2").hide();
    if (withdrawId == 1) {
        $("#advanced1").show();
        $("#advanced2").show();
        let id;
        let stakingAddress;
        if (selectedNetwork == "xDAI") {
            id = xdaiId;
            stakingAddress = addressXGTStakeXDai;
        } else if (selectedNetwork == "BSC") {
            id = bscId;
            stakingAddress = addressXGTStakeBSC;
        } else {
            return;
        }
        let networkOk = await waitForSwitch(id, "withdraw");
        if (!networkOk) {
            return;
        }
        let stakingContract = new web3.eth.Contract(
            abiStaking,
            stakingAddress,
            null
        );

        let depositTime = await stakingContract.methods
            .userInfo(selectedAccount)
            .call();
        if (depositTime[2] > Date.now() / 1000 - 72 * 60 * 60) {
            $("#penalty").show();
        }

        $('strong[id^="withdraw-total"]').html(amount);

        $('strong[id^="withdraw-fee"]').html("<0.01");
        $('strong[id^="withdraw_amount"]').html(amount);
        let penalty = parseFloat(amount * 0.001).toFixed(0);
        if (penalty <= 0 || penalty == "0") {
            penalty = "<$0.01";
        } else {
            penalty = "$" + penalty;
        }
        $('strong[id^="withdraw_penalty_amount"]').html(penalty);
        $('strong[id^="withdraw_goal"]').html("EARNING SHARES");
        $("#confirm_withdraw_1").addClass("popup_open");
    } else if (withdrawId == 2) {
        let thisPair;
        let thisRouter;
        if (selectedNetwork == "xDAI") {
            let networkOk = await waitForSwitch(xdaiId, "withdraw");
            if (!networkOk) {
                return;
            }
            $('strong[id^="withdraw-fee"]').html("<0.01");
            thisPair = addressPair;
            thisRouter = addressRouter;
        } else if (selectedNetwork == "BSC") {
            let networkOk = await waitForSwitch(bscId, "withdraw");
            if (!networkOk) {
                return;
            }
            $('strong[id^="withdraw-fee"]').html("<0.50");
            thisPair = addressPairBSC;
            thisRouter = addressRouterBSC;
        }

        $('strong[id^="withdraw-total"]').html(amount);
        $('strong[id^="withdraw_amount"]').html(amount);
        $('strong[id^="withdraw_goal"]').html("FARMING SHARES");

        let fraction = new Big(amount / parseFloat(lpValue).toFixed(2))
            .mul(new Big(lpShares.toString()))
            .toFixed(0);
        if (fraction.toString() == "0") {
            fraction = lpShares;
        }
        fraction = new Big(fraction).mul(new Big(10 ** 18)).toFixed(0);
        let pairContract = new web3.eth.Contract(abiPair, thisPair, null);
        let allowance = await pairContract.methods
            .allowance(selectedAccount, thisRouter)
            .call();
        if (new Big(allowance.toString()).lt(fraction)) {
            $("#confirm_approval_withdraw").addClass("popup_open");
        } else {
            $("#confirm_withdraw_1").addClass("popup_open");
        }
    } else if (withdrawId == 3) {
        let networkOk = await waitForSwitch(xdaiId, "claim");
        if (!networkOk) {
            return;
        }
        $('strong[id^="withdraw-total"]').html(amount);
        $('strong[id^="withdraw-fee"]').html("<0.01");
        $('strong[id^="withdraw_amount"]').html(amount);
        $('strong[id^="withdraw_goal"]').html("XGT REWARDS");
        $("#confirm_withdraw_1").addClass("popup_open");
    } else if (withdrawId == 4) {
        let networkOk = await waitForSwitch(xdaiId, "withdraw");
        if (!networkOk) {
            return;
        }
        $('strong[id^="withdraw-total"]').html(amount);
        $('strong[id^="withdraw-fee"]').html("18.12");
        $('strong[id^="withdraw_amount"]').html(amount);
        $('strong[id^="withdraw_goal"]').html("COMBINED SHARES");

        let pairContract = new web3.eth.Contract(abiPair, addressPair, null);
        let allowance = await pairContract.methods
            .allowance(selectedAccount, addressRouter)
            .call();
        if (new Big(allowance.toString()).lt(new Big(lpShares.toString()))) {
            $("#confirm_approval_withdraw_all").addClass("popup_open");
        } else {
            $("#confirm_withdraw_2_1_all").addClass("popup_open");
        }
    }
}

async function withdraw_Approve() {
    let amount = parseFloat($("#withdraw-input").val()).toFixed(2);
    $("#confirm_approval_withdraw").removeClass("popup_open");
    $("#confirm_approval_withdraw_all").removeClass("popup_open");
    $("#wait_purpose").html(
        "Waiting for the approval transaction to finish..."
    );
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("WITHDRAW");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        withdraw_Approve();
    });
    let lpValueTemp;
    let fraction;
    if (selectedNetwork == "xDAI") {
        lpValueTemp = parseFloat(
            (latestInfo.total_pool_value[0] / latestInfo.total_pool_tokens[0]) *
                lpShares
        );
        fraction = new Big(amount / parseFloat(lpValueTemp)).mul(
            new Big(lpShares)
        );
    } else if (selectedNetwork == "BSC") {
        lpValueTemp = parseFloat(
            (latestInfo.total_pool_value[1] / latestInfo.total_pool_tokens[1]) *
                lpShares
        );
        fraction = new Big(amount / parseFloat(lpValueTemp)).mul(
            new Big(lpShares)
        );
    }

    if (withdrawId == 4) {
        fraction = lpShares;
    }
    if (new Big(fraction).gt(new Big(lpShares))) {
        fraction = lpShares;
    }
    fraction = new Big(fraction).mul(new Big(10 ** 18)).toFixed(0);

    let thisPair;
    let thisRouter;
    if (selectedNetwork == "xDAI") {
        thisPair = addressPair;
        thisRouter = addressRouter;
    } else if (selectedNetwork == "BSC") {
        thisPair = addressPairBSC;
        thisRouter = addressRouterBSC;
    }

    let pairContract = new web3.eth.Contract(abiPair, thisPair, null);
    let currentBalance = await pairContract.methods
        .balanceOf(selectedAccount)
        .call();
    if (new Big(currentBalance).sub(fraction).lt(new Big(10 ** 17))) {
        fraction = currentBalance;
    }
    try {
        let txReturn = await pairContract.methods
            .approve(thisRouter, fraction.toString())
            .send({
                from: selectedAccount,
            });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('strong[id^="withdraw-total"]').html("0.00");
            $('strong[id^="withdraw-fee"]').html("0.00");
            if (withdrawId == 4) {
                $("#confirm_withdraw_3_2_all").addClass("popup_open");
            } else {
                $("#confirm_withdraw_2").addClass("popup_open");
            }
            return;
        } else {
            $("#error-popup").addClass("popup_open");
            return;
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e);
    }
    $("#wait-popup").removeClass("popup_open");
}

async function withdraw_Final(step, stepLen, estimate) {
    let amount = parseFloat($("#withdraw-input").val()).toFixed(2);
    if (estimate) {
        let networkOk = await waitForSwitch(mainnetId, "withdraw");
        if (!networkOk) {
            return;
        }
        let XGTStakeMainnetContract = new web3.eth.Contract(
            abiXGTStakeMainnet,
            addressXGTStakeMainnet,
            null
        );
        amount = new Big(amount.toString())
            .mul(new Big(10 ** decimalsDai))
            .toFixed(0)
            .toString();
        let txReturn = await XGTStakeMainnetContract.methods
            .withdrawTokens(amount)
            .estimateGas({
                from: selectedAccount,
            });
        return txReturn;
    }
    $("#confirm_withdraw_1").removeClass("popup_open");
    $("#confirm_withdraw_2").removeClass("popup_open");
    $("#confirm_withdraw_2_1_all").removeClass("popup_open");
    $("#confirm_withdraw_2_2_all").removeClass("popup_open");
    $("#confirm_withdraw_3_2_all").removeClass("popup_open");
    $("#confirm_withdraw_3_3_all").removeClass("popup_open");

    if (withdrawId == 1 || (withdrawId == 4 && step == 1)) {
        let id;
        if (selectedNetwork == "xDAI") {
            id = xdaiId;
        } else if (selectedNetwork == "BSC") {
            id = bscId;
        } else {
            return;
        }
        let networkOk = await waitForSwitch(id, "withdraw");
        if (!networkOk) {
            return;
        }
    } else {
        if (withdrawId != 3) {
            if (selectedNetwork == "xDAI") {
                let networkOk = await waitForSwitch(xdaiId, "withdraw");
                if (!networkOk) {
                    return;
                }
            } else if (selectedNetwork == "BSC") {
                let networkOk = await waitForSwitch(bscId, "withdraw");
                if (!networkOk) {
                    return;
                }
            }
        }
    }

    $("#wait_purpose").html(
        "Waiting for the withdraw transaction to finish..."
    );
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("WITHDRAW");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        withdraw_Final();
    });

    if (withdrawId == 1 || (withdrawId == 4 && step == 1)) {
        let withdrawAll = false;
        if (parseFloat(stakeValue.toString()) - amount <= 0.5 || step == 1) {
            withdrawAll = true;
        } else {
            amount = new Big((parseFloat(amount) / xgtPrice).toString())
                .mul(new Big(10 ** 18))
                .toFixed(0)
                .toString();
        }
        let stakingAddress;
        let txUrl;
        if (selectedNetwork == "xDAI") {
            stakingAddress = addressXGTStakeXDai;
            txUrl = txUrlXDai;
        } else if (selectedNetwork == "BSC") {
            stakingAddress = addressXGTStakeBSC;
            txUrl = txUrlBSC;
        }
        let stakingContract = new web3.eth.Contract(
            abiStaking,
            stakingAddress,
            null
        );
        let staked = await stakingContract.methods
            .getCurrentUserInfo(selectedAccount)
            .call();
        // if (new Big(staked.toString()).eq(new Big("0"))) {
        //     if (step == 1) {
        //         if (stepLen == 2) {
        //             $("#confirm_withdraw_2_2_all").addClass("popup_open");
        //         } else {
        //             $("#confirm_withdraw_3_3_all").addClass("popup_open");
        //         }
        //     }
        //     return
        // }
        if (!withdrawAll) {
            amount = new Big(staked[2].toString())
                .mul(new Big(amount))
                .div(new Big(staked[0].toString()))
                .toFixed(0)
                .toString();
        }
        try {
            let txReturn;
            if (withdrawAll) {
                txReturn = await stakingContract.methods.withdrawAll().send({
                    from: selectedAccount,
                });
            } else {
                txReturn = await stakingContract.methods.withdraw(amount).send({
                    from: selectedAccount,
                });
            }
            $("#wait-popup").removeClass("popup_open");
            if (txReturn.status) {
                $('[id^="txlink"]').prop("onclick", null).off("click");
                $('[id^="txlink"]').on("click", function () {
                    window.open(txUrl + txReturn.transactionHash, "_blank");
                });
                if (step == 1) {
                    if (stepLen == 2) {
                        $("#confirm_withdraw_2_2_all").addClass("popup_open");
                    } else {
                        $("#confirm_withdraw_3_3_all").addClass("popup_open");
                    }
                } else {
                    $("#withdraw-success").addClass("popup_open");
                }
                refreshBalance();
                return;
            } else {
                $("#error-popup").addClass("popup_open");
                return;
            }
        } catch (e) {
            $("#error-popup").addClass("popup_open");
            console.log(e);
        }
        $("#wait-popup").removeClass("popup_open");
    } else if (withdrawId == 2 || (withdrawId == 4 && step == 2)) {
        let lpValueTemp;
        let fraction;
        if (selectedNetwork == "xDAI") {
            lpValueTemp = parseFloat(
                (latestInfo.total_pool_value[0] /
                    latestInfo.total_pool_tokens[0]) *
                    lpShares
            );
            fraction = new Big(amount / parseFloat(lpValueTemp)).mul(
                new Big(lpShares)
            );
        } else if (selectedNetwork == "BSC") {
            lpValueTemp = parseFloat(
                (latestInfo.total_pool_value[1] /
                    latestInfo.total_pool_tokens[1]) *
                    lpShares
            );
            fraction = new Big(amount / parseFloat(lpValueTemp)).mul(
                new Big(lpShares)
            );
        }

        if (withdrawId == 4) {
            fraction = lpShares;
        }
        if (new Big(fraction).gt(new Big(lpShares))) {
            fraction = lpShares;
        }

        let thisPair;
        let thisRouter;
        if (selectedNetwork == "xDAI") {
            thisPair = addressPair;
            thisRouter = addressRouter;
        } else if (selectedNetwork == "BSC") {
            thisPair = addressPairBSC;
            thisRouter = addressRouterBSC;
        }

        let routerContract = new web3.eth.Contract(abiRouter, thisRouter, null);
        let pairContract = new web3.eth.Contract(abiPair, thisPair, null);
        try {
            await getLPValue();
            let minXGT = new Big(lpXGT)
                .mul(fraction)
                .div(new Big(web3.utils.toWei(lpShares.toString())))
                .mul(new Big("0.8"))
                .mul(new Big("1000000000000000000"))
                .toFixed(0);
            let minXDAI = new Big(lpBase)
                .mul(fraction)
                .div(new Big(web3.utils.toWei(lpShares.toString())))
                .mul(new Big("0.8"))
                .mul(new Big("1000000000000000000"))
                .toFixed(0);
            fraction = new Big(fraction).mul(new Big(10 ** 18)).toFixed(0);
            let currentBalance = await pairContract.methods
                .balanceOf(selectedAccount)
                .call();
            if (new Big(currentBalance).sub(fraction).lt(new Big(10 ** 17))) {
                fraction = currentBalance;
            }
            lastLPValue = lpValue;
            let txReturn = await routerContract.methods
                .removeLiquidityETH(
                    addressXGT,
                    fraction.toString(),
                    minXGT.toString(),
                    minXDAI.toString(),
                    selectedAccount,
                    Math.round(new Date().getTime() / 1000) + 60 * 60
                )
                .send({
                    from: selectedAccount,
                });
            $("#wait-popup").removeClass("popup_open");
            if (txReturn.status) {
                refreshBalance(true);
                $('[id^="txlink"]').prop("onclick", null).off("click");
                if (selectedNetwork == "xDAI") {
                    $('[id^="txlink"]').on("click", function () {
                        window.open(
                            txUrlXDai + txReturn.transactionHash,
                            "_blank"
                        );
                    });
                } else if (selectedNetwork == "BSC") {
                    $('[id^="txlink"]').on("click", function () {
                        window.open(
                            txUrlBSC + txReturn.transactionHash,
                            "_blank"
                        );
                    });
                }

                $("#withdraw-success").addClass("popup_open");
                if (withdrawId == 4) {
                    $("#withdraw-input").val("0.00");
                }
                return;
            } else {
                $("#error-popup").addClass("popup_open");
                return;
            }
        } catch (e) {
            $("#error-popup").addClass("popup_open");
            console.log(e);
        }
        $("#wait-popup").removeClass("popup_open");
    } else if (withdrawId == 3) {
        $("#wait_purpose").html(
            "Waiting for the claim transaction to finish..."
        );
        let withdrawTo = 0;
        if (selectedNetwork == "BSC") {
            withdrawTo = 56;
            let networkOk = await waitForSwitch(bscId, "withdraw");
            if (!networkOk) {
                return;
            }
        } else if (selectedNetwork == "xDAI") {
            let networkOk = await waitForSwitch(xdaiId, "withdraw");
            if (!networkOk) {
                return;
            }
        } else {
            return;
        }

        let XGTRewardChest = new web3.eth.Contract(
            abiRewardChest,
            addressRewardChest,
            null
        );
        try {
            if (withdrawTo == 0) {
                let txReturn = await XGTRewardChest.methods.claim().send({
                    from: selectedAccount,
                    gasLimit: 1000000,
                });
                $("#wait-popup").removeClass("popup_open");
                if (txReturn.status) {
                    $('[id^="txlink"]').prop("onclick", null).off("click");
                    $('[id^="txlink"]').on("click", function () {
                        window.open(
                            txUrlXDai + txReturn.transactionHash,
                            "_blank"
                        );
                    });
                    $("#withdraw-input").val("0.00");
                    $("#swapPurpose").html("CLAIMED");
                    $("#swap-xgt-success").addClass("popup_open");
                    refreshBalance();
                    return;
                } else {
                    $("#error-popup").addClass("popup_open");
                    return;
                }
            } else {
                $("#wait-popup").addClass("popup_open");
                // $("#swapPurpose").html("CLAIMED");
                await claimMeta(withdrawTo);
                // let txReturn = await XGTRewardChest.methods
                //     .claimToNetwork(withdrawTo)
                //     .send({
                //         from: selectedAccount,
                //         gasLimit: 400000
                //     });
                // $("#wait-popup").removeClass("popup_open");
                // if (txReturn.status) {
                //     while (swapHash == null || swapHash.indexOf("0x") == -1) {
                //         swapHash = txReturn.transactionHash;
                //         if (swapHash == null || swapHash.indexOf("0x") == -1) {
                //             await sleep(1000);
                //         }
                //     }
                //     let txLogs = await web3xDai.eth.getTransactionReceipt(swapHash)
                //     swapEncodedData = ("0x" + (txLogs.logs[3].data).substring(130)).slice(0, -22)
                //     localStorage.setItem("CROSS_CHAIN_SWAP", 56)
                //     localStorage.setItem("CROSS_CHAIN_SWAP_DATA", swapEncodedData)
                //     $('strong[id^="swap-fee"]').html("0.35");
                //     bridgeStep = 2;
                //     $("#wait-popup").addClass("popup_open");
                //     sendXGTtoBSC_2()
                // return
                // } else {
                //     $("#error-popup").addClass("popup_open");
                //     return
                // }
            }
        } catch (e) {
            $("#error-popup").addClass("popup_open");
            console.log(e);
        }
        $("#wait-popup").removeClass("popup_open");
    }
    $("#withdraw-input").val("");
}

async function swap() {
    await checkConnected();
    if (typeof web3 == "undefined") {
        return;
    }
    if ($("#swapLeft").val() == "" || $("#swapRight").val() == "") {
        return;
    }

    if ($("#swapLeft").hasClass("redInput")) {
        $("#error-popup-money-swap").addClass("popup_open");
        return;
    }

    $("#treebox").hide();
    $("#planttree").prop("checked", false);
    $("#singleswap_first").html("1/<strong>1</strong>");

    let xgtContract = new web3.eth.Contract(abiXGT, addressXGT, null);
    let xgtAmount, xDaiAmount;
    if ($("#swap-select-left").val() == "usd") {
        let amount = web3.utils.toWei($("#swapLeft").val(), "ether").toString();
        if ($("#swap-select-right").val() == "eth") {
            amount = web3.utils
                .toWei($("#swapRight").val(), "ether")
                .toString();
        }
        let output = $("#swap-select-right").val();
        let screen = "auto";
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            screen = "mobile";
        }
        let widget = new rampInstantSdk.RampInstantSDK({
            hostAppName: "Xion Finance",
            hostLogoUrl: "https://xion.finance/images/logo.svg",
            swapAmount: amount,
            userAddress: selectedAccount,
            hostApiKey: "wuzhxcpush76oxtbwrsx78fxfuv4czocy27ovkfh",
            swapAsset: "XDAI_XDAI",
            variant: screen,
        });
        widget.show();
        widget.domNodes.overlay.style.zIndex = 9999999999;
        console.log(widget.domNodes);
        return;
    }

    if ($("#swap-select-left").val() == "xgt-to-bsc") {
        let networkOk = await waitForSwitch(xdaiId, "swap");
        if (!networkOk) {
            return;
        }
        let xgtTransferAmount = $("#swapLeft").val();
        let cost = "0.50";
        let bscBalance = await web3bsc.eth.getBalance(selectedAccount);
        if (new Big(bscBalance.toString()).lt(new Big("2000000000000000"))) {
            $("#wait-popup").removeClass("popup_open");
            $("#errormsg").html(
                "You don't have enough BNB in your account for this transaction."
            );
            $("#error-detail-target").html("SWAPPING");
            $("#error-popup-detail").addClass("popup_open");
            return;
        }
        $('strong[id^="swap-total"]').html(
            parseFloat(xgtTransferAmount).toFixed(2) + " XGT"
        );
        $('strong[id^="swap-fee"]').html(cost);
        $('strong[id^="left-amount"]').html("FROM XDAI");
        $('strong[id^="right-amount"]').html("BSC");
        $("#confirm_approval_swap_3step").addClass("popup_open");
        return;
    } else if ($("#swap-select-left").val() == "xgt-to-xdai") {
        let networkOk = await waitForSwitch(bscId, "swap");
        if (!networkOk) {
            return;
        }
        let xgtTransferAmount = $("#swapLeft").val();
        let bscBalance = await web3bsc.eth.getBalance(selectedAccount);
        if (new Big(bscBalance.toString()).lt(new Big("2000000000000000"))) {
            $("#wait-popup").removeClass("popup_open");
            $("#errormsg").html(
                "You don't have enough BNB in your account for this transaction."
            );
            $("#error-detail-target").html("SWAPPING");
            $("#error-popup-detail").addClass("popup_open");
            return;
        }
        $('strong[id^="swap-total"]').html(
            parseFloat(xgtTransferAmount).toFixed(2) + " XGT"
        );
        $('strong[id^="swap-fee"]').html("0.10");
        $('strong[id^="left-amount"]').html("FROM BSC");
        $('strong[id^="right-amount"]').html("XDAI");
        $("#confirm_swap_1").addClass("popup_open");
        return;
    }

    if (fixedLeft) {
        if (
            $("#swap-select-left").val() == "dai" &&
            $("#swap-select-right").val() == "xdai"
        ) {
            if (parseFloat($("#swapLeft").val()) < 0.005) {
                $("#wait-popup").removeClass("popup_open");
                $("#errormsg").html(
                    "You need swap at least 0.005 DAI to xDAI."
                );
                $("#error-detail-target").html("SWAPPING");
                $("#error-popup-detail").addClass("popup_open");
                return;
            }
            let networkOk = await waitForSwitch(mainnetId, "swap");
            if (!networkOk) {
                return;
            }
            let daiAmount = $("#swapLeft").val();
            let fee = 55509;
            let gasOracle = new web3Mainnet.eth.Contract(
                abiOracle,
                oracleGas,
                null
            );
            let ethDaiOracle = new web3Mainnet.eth.Contract(
                abiOracle,
                oracleEthDai,
                null
            );
            let latestGas = await gasOracle.methods.latestAnswer().call();
            let latestEthDai = await ethDaiOracle.methods.latestAnswer().call();
            let cost = new Big(latestGas.toString())
                .mul(new Big(fee))
                .div(new Big(latestEthDai.toString()))
                .toFixed(2)
                .toString();
            $('strong[id^="swap-total"]').html(
                parseFloat(parseFloat(daiAmount)).toFixed(2) + " DAI"
            );
            $('strong[id^="swap-fee"]').html(cost);
            $('strong[id^="left-amount"]').html(
                parseFloat(daiAmount).toFixed(2) + " DAI"
            );
            $('strong[id^="right-amount"]').html(
                parseFloat(daiAmount).toFixed(2) + " xDAI"
            );
            $("#confirm_swap_1").addClass("popup_open");
            swapId = 5;
        } else if (
            $("#swap-select-left").val() == "xdai" &&
            $("#swap-select-right").val() == "dai"
        ) {
            if (parseFloat($("#swapLeft").val()) < 10) {
                $("#wait-popup").removeClass("popup_open");
                $("#errormsg").html("You need swap at least 10 xDAI to DAI.");
                $("#error-detail-target").html("SWAPPING");
                $("#error-popup-detail").addClass("popup_open");
                return;
            }
            let networkOk = await waitForSwitch(xdaiId, "swap");
            if (!networkOk) {
                return;
            }
            let xDaiAmount = $("#swapRight").val();
            $('strong[id^="swap-total"]').html(
                parseFloat(parseFloat(xDaiAmount)).toFixed(2) + " xDAI"
            );
            let fee = 209496;
            let gasOracle = new web3Mainnet.eth.Contract(
                abiOracle,
                oracleGas,
                null
            );
            let ethDaiOracle = new web3Mainnet.eth.Contract(
                abiOracle,
                oracleEthDai,
                null
            );
            let latestGas = await gasOracle.methods.latestAnswer().call();
            let latestEthDai = await ethDaiOracle.methods.latestAnswer().call();
            let ethCost = new Big(latestGas.toString()).mul(new Big(fee));
            let cost = new Big(latestGas.toString())
                .mul(new Big(fee))
                .div(new Big(latestEthDai.toString()))
                .toFixed(2)
                .toString();
            let mainnetBalance = await web3Mainnet.eth.getBalance(
                selectedAccount
            );
            if (new Big(mainnetBalance.toString()).lt(ethCost)) {
                $("#wait-popup").removeClass("popup_open");
                $("#errormsg").html(
                    "You don't have enough ETH in your account for this transaction."
                );
                $("#error-detail-target").html("SWAPPING");
                $("#error-popup-detail").addClass("popup_open");
                return;
            }
            $('strong[id^="swap-fee"]').html(cost);
            $('strong[id^="left-amount"]').html(
                parseFloat(xDaiAmount).toFixed(2) + " xDAI"
            );
            $('strong[id^="right-amount"]').html(
                parseFloat(xDaiAmount).toFixed(2) + " DAI"
            );
            $("#confirm_approval_swap").addClass("popup_open");
            swapId = 6;
        } else if ($("#swap-select-left").val() != "xgt") {
            let targetID = xdaiId;
            let currencyText = "xDAI";
            let baseValue = gBalanceXDai;
            if (selectedNetwork == "ETH") {
                currencyText = "ETH";
                targetID = mainnetId;
                baseValue = gBalanceETH;
            } else if (selectedNetwork == "BSC") {
                currencyText = "BNB";
                targetID = bscId;
                baseValue = gBalanceBNB;
            }
            let networkOk = await waitForSwitch(targetID, "swap");
            if (!networkOk) {
                return;
            }
            xDaiAmount = $("#swapLeft").val();
            xgtAmount = new Big($("#swapRight").val()).mul(
                new Big(0.98).toString()
            );
            $('strong[id^="swap-total"]').html(
                parseFloat(xDaiAmount) + " " + currencyText
            );
            $('strong[id^="swap-fee"]').html("<0.01");
            $('strong[id^="left-amount"]').html(
                parseFloat(xDaiAmount) + " " + currencyText
            );
            $('strong[id^="right-amount"]').html(
                parseFloat(xgtAmount).toFixed(2) + " XGT"
            );
            $("#treebox").show();
            if (
                selectedNetwork == "xDAI" &&
                baseValue >= parseFloat(xDaiAmount) + 0.8
            ) {
                $("#planttree").prop("disabled", false);
            } else {
                $("#planttree").prop("disabled", true);
            }
            $("#confirm_swap_1").addClass("popup_open");
            swapId = 1;
        } else {
            let targetID = xdaiId;
            let currencyText = "xDAI";
            let router = addressRouter;
            if (selectedNetwork == "ETH") {
                currencyText = "ETH";
                targetID = mainnetId;
                xgtContract = new web3Mainnet.eth.Contract(
                    abiXGT,
                    addressXGT,
                    null
                );
                router = addressRouterETH;
            } else if (selectedNetwork == "BSC") {
                currencyText = "BNB";
                targetID = bscId;
                xgtContract = new web3bsc.eth.Contract(
                    abiXGT,
                    addressXGTBSC,
                    null
                );
                router = addressRouterBSC;
            }
            let networkOk = await waitForSwitch(targetID, "swap");
            if (!networkOk) {
                return;
            }
            xDaiAmount = new Big($("#swapRight").val()).mul(
                new Big(0.98).toString()
            );
            xgtAmount = $("#swapLeft").val();
            $('strong[id^="swap-total"]').html(
                parseFloat(xgtAmount).toFixed(2) + " XGT"
            );
            $('strong[id^="swap-fee"]').html("<0.01");
            $('strong[id^="left-amount"]').html(
                parseFloat(xgtAmount).toFixed(2) + " XGT"
            );
            $('strong[id^="right-amount"]').html(
                parseFloat(xDaiAmount).toFixed(2) + " " + currencyText
            );
            xgtAmount = web3.utils.toWei(xgtAmount, "ether");
            let allowance = await xgtContract.methods
                .allowance(selectedAccount, router)
                .call();
            if (new Big(allowance).lt(new Big(xgtAmount.toString()))) {
                $("#confirm_approval_swap").addClass("popup_open");
            } else {
                $("#confirm_swap_1").addClass("popup_open");
            }
            swapId = 2;
        }
    } else {
        if (
            $("#swap-select-left").val() == "dai" &&
            $("#swap-select-right").val() == "xdai"
        ) {
            if (parseFloat($("#swapLeft").val()) < 0.005) {
                $("#wait-popup").removeClass("popup_open");
                $("#errormsg").html(
                    "You need swap at least 0.005 DAI to xDAI."
                );
                $("#error-detail-target").html("SWAPPING");
                $("#error-popup-detail").addClass("popup_open");
                return;
            }
            let networkOk = await waitForSwitch(mainnetId, "swap");
            if (!networkOk) {
                return;
            }
            let daiAmount = $("#swapLeft").val();
            let fee = 55509;
            let gasOracle = new web3Mainnet.eth.Contract(
                abiOracle,
                oracleGas,
                null
            );
            let ethDaiOracle = new web3Mainnet.eth.Contract(
                abiOracle,
                oracleEthDai,
                null
            );
            let latestGas = await gasOracle.methods.latestAnswer().call();
            let latestEthDai = await ethDaiOracle.methods.latestAnswer().call();
            let cost = new Big(latestGas.toString())
                .mul(new Big(fee))
                .div(new Big(latestEthDai.toString()))
                .toFixed(2)
                .toString();
            $('strong[id^="swap-total"]').html(
                parseFloat(parseFloat(daiAmount)).toFixed(2) + " DAI"
            );
            $('strong[id^="swap-fee"]').html(cost);
            $('strong[id^="left-amount"]').html(
                parseFloat(daiAmount).toFixed(2) + " DAI"
            );
            $('strong[id^="right-amount"]').html(
                parseFloat(daiAmount).toFixed(2) + " xDAI"
            );
            $("#confirm_swap_1").addClass("popup_open");
            swapId = 5;
        } else if (
            $("#swap-select-left").val() == "xdai" &&
            $("#swap-select-right").val() == "dai"
        ) {
            if (parseFloat($("#swapLeft").val()) < 10) {
                $("#wait-popup").removeClass("popup_open");
                $("#errormsg").html("You need swap at least 10 xDAI to DAI.");
                $("#error-detail-target").html("SWAPPING");
                $("#error-popup-detail").addClass("popup_open");
                return;
            }
            let networkOk = await waitForSwitch(xdaiId, "swap");
            if (!networkOk) {
                return;
            }
            let xDaiAmount = $("#swapRight").val();
            $('strong[id^="swap-total"]').html(
                parseFloat(parseFloat(xDaiAmount)).toFixed(2) + " xDAI"
            );
            let fee = 209496;
            let gasOracle = new web3Mainnet.eth.Contract(
                abiOracle,
                oracleGas,
                null
            );
            let ethDaiOracle = new web3Mainnet.eth.Contract(
                abiOracle,
                oracleEthDai,
                null
            );
            let latestGas = await gasOracle.methods.latestAnswer().call();
            let latestEthDai = await ethDaiOracle.methods.latestAnswer().call();
            let ethCost = new Big(latestGas.toString()).mul(new Big(fee));
            let cost = new Big(latestGas.toString())
                .mul(new Big(fee))
                .div(new Big(latestEthDai.toString()))
                .toFixed(2)
                .toString();
            let mainnetBalance = await web3Mainnet.eth.getBalance(
                selectedAccount
            );
            if (new Big(mainnetBalance.toString()).lt(ethCost)) {
                $("#wait-popup").removeClass("popup_open");
                $("#errormsg").html(
                    "You don't have enough ETH in your account for this transaction."
                );
                $("#error-detail-target").html("SWAPPING");
                $("#error-popup-detail").addClass("popup_open");
                return;
            }
            $('strong[id^="swap-fee"]').html(cost);
            $('strong[id^="left-amount"]').html(
                parseFloat(xDaiAmount).toFixed(2) + " xDAI"
            );
            $('strong[id^="right-amount"]').html(
                parseFloat(xDaiAmount).toFixed(2) + " DAI"
            );
            $("#confirm_approval_swap").addClass("popup_open");
            swapId = 6;
        } else if ($("#swap-select-right").val() != "xgt") {
            let targetID = xdaiId;
            let currencyText = "xDAI";
            let router = addressRouter;
            if (selectedNetwork == "ETH") {
                currencyText = "ETH";
                targetID = mainnetId;
                xgtContract = new web3Mainnet.eth.Contract(
                    abiXGT,
                    addressXGT,
                    null
                );
                router = addressRouterETH;
            } else if (selectedNetwork == "BSC") {
                currencyText = "BNB";
                targetID = bscId;
                xgtContract = new web3bsc.eth.Contract(
                    abiXGT,
                    addressXGTBSC,
                    null
                );
                router = addressRouterBSC;
            }
            let networkOk = await waitForSwitch(targetID, "swap");
            if (!networkOk) {
                return;
            }

            xDaiAmount = $("#swapRight").val();
            xgtAmount = new Big($("#swapLeft").val())
                .mul(new Big(1.02))
                .toString();
            $('strong[id^="swap-total"]').html(
                parseFloat(xgtAmount).toFixed(2) + " XGT"
            );
            $('strong[id^="swap-fee"]').html("<0.01");
            $('strong[id^="left-amount"]').html(
                parseFloat(xgtAmount).toFixed(2) + " XGT"
            );
            $('strong[id^="right-amount"]').html(
                parseFloat(xDaiAmount).toFixed(2) + " " + currencyText
            );
            xgtAmount = web3.utils.toWei(xgtAmount, "ether");
            let allowance = await xgtContract.methods
                .allowance(selectedAccount, router)
                .call();
            console.log(allowance);
            if (new Big(allowance).lt(new Big(xgtAmount.toString()))) {
                $("#confirm_approval_swap").addClass("popup_open");
            } else {
                $("#confirm_swap_1").addClass("popup_open");
            }
            swapId = 3;
        } else {
            let targetID = xdaiId;
            let currencyText = "xDAI";
            let router = addressRouter;
            if (selectedNetwork == "ETH") {
                currencyText = "ETH";
                targetID = mainnetId;
                xgtContract = new web3Mainnet.eth.Contract(
                    abiXGT,
                    addressXGT,
                    null
                );
                router = addressRouterETH;
            } else if (selectedNetwork == "BSC") {
                currencyText = "BNB";
                targetID = bscId;
                xgtContract = new web3bsc.eth.Contract(
                    abiXGT,
                    addressXGTBSC,
                    null
                );
                router = addressRouterBSC;
            }
            let networkOk = await waitForSwitch(targetID, "swap");
            if (!networkOk) {
                return;
            }
            xgtAmount = $("#swapRight").val();
            xDaiAmount = web3.utils.fromWei(currentLeft);
            $('strong[id^="swap-total"]').html(
                parseFloat(parseFloat(xDaiAmount)).toFixed(2) +
                    " " +
                    currencyText
            );
            $('strong[id^="swap-fee"]').html("<0.01");
            $('strong[id^="left-amount"]').html(
                parseFloat(xDaiAmount).toFixed(2) + " " + currencyText
            );
            $('strong[id^="right-amount"]').html(
                parseFloat(xgtAmount).toFixed(2) + " XGT"
            );
            $("#treebox").show();
            if (gBalanceXDai >= parseFloat(xDaiAmount) + 0.8) {
                $("#planttree").prop("disabled", false);
            } else {
                $("#planttree").prop("disabled", true);
            }
            $("#confirm_swap_1").addClass("popup_open");
            swapId = 4;
        }
    }
}

async function swap_Approve() {
    if (bridgeStep == 1) {
        sendXGTtoBSC();
        return;
    }
    $("#confirm_approval_swap").removeClass("popup_open");
    $("#confirm_approval_swap_3step").removeClass("popup_open");
    $("#wait_purpose").html(
        "Waiting for the approval transaction to finish..."
    );
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("SWAP");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        swap_Approve();
    });

    let xgtAmount;
    if (fixedLeft) {
        xgtAmount = web3.utils.toWei($("#swapLeft").val(), "ether");
    } else {
        xgtAmount = web3.utils.toWei(
            parseFloat(
                new Big($("#swapLeft").val()).mul(
                    new Big(
                        1 + parseFloat($("#slippage").val()) / 100
                    ).toString()
                )
            ).toString(),
            "ether"
        );
    }
    try {
        let thisAddressXGT = addressXGT;
        let thisAddressRouter = addressRouter;
        if (selectedNetwork == "BSC") {
            thisAddressXGT = addressXGTBSC;
            thisAddressRouter = addressRouterBSC;
        } else if (selectedNetwork == "ETH") {
            thisAddressRouter = addressRouterETH;
        }

        if ($("#swap-select-left").val() == "xgt-to-bsc") {
            fixedLeft = true;
            thisAddressRouter = "0xA814DdFd5F5e7259cA3897B5cEAEdB0e087924E3";
        }

        if (swapId != 5 && swapId != 6) {
            let xgtContract = new web3.eth.Contract(
                abiXGT,
                thisAddressXGT,
                null
            );
            let txReturn = await xgtContract.methods
                .approve(thisAddressRouter, uint256Max)
                .send({
                    from: selectedAccount,
                });
            $("#wait-popup").removeClass("popup_open");
            if (txReturn.status) {
                $('strong[id^="swap-fee"]').html("0.00");
                if ($("#swap-select-left").val() == "xgt-to-bsc") {
                    $("#confirm_approval_swap_3step_2").addClass("popup_open");
                    bridgeStep = 1;
                } else {
                    $('strong[id^="swap-total"]').html("0.00");
                    $("#confirm_swap_2").addClass("popup_open");
                }
                return;
            } else {
                $("#error-popup").addClass("popup_open");
                return;
            }
        } else if (swapId == 5) {
            let daiContract = new web3.eth.Contract(abiDAI, addressDAI, null);
            let txReturn = await daiContract.methods
                .approve(
                    addressDAIBridgeMainnet,
                    web3.utils.toWei($("#swapLeft").val(), "ether")
                )
                .send({
                    from: selectedAccount,
                });
            $("#wait-popup").removeClass("popup_open");
            if (txReturn.status) {
                $('strong[id^="swap-total"]').html("0.00");
                $('strong[id^="swap-fee"]').html("0.00");
                $("#confirm_swap_2").addClass("popup_open");
                return;
            } else {
                $("#error-popup").addClass("popup_open");
                return;
            }
        } else if (swapId == 6) {
            let xDaiAmount = web3.utils.toWei($("#swapRight").val(), "ether");
            let txReturn = await web3.eth.sendTransaction({
                to: addressDAIBridgeXDai,
                from: selectedAccount,
                value: xDaiAmount,
            });
            $("#wait-popup").removeClass("popup_open");
            if (txReturn.status) {
                while (
                    withdrawHash == null ||
                    withdrawHash.indexOf("0x") == -1
                ) {
                    withdrawHash = txReturn.transactionHash;
                    if (
                        withdrawHash == null ||
                        withdrawHash.indexOf("0x") == -1
                    ) {
                        await sleep(1000);
                    }
                }
                $('strong[id^="swap-total"]').html("0.00");
                $('strong[id^="swap-fee"]').html("0.00");
                $("#confirm_swap_2").addClass("popup_open");
                return;
            } else {
                $("#error-popup").addClass("popup_open");
                return;
            }
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e);
    }
    $("#wait-popup").removeClass("popup_open");
}

async function swap_Final() {
    $("#planttree").prop("disabled", true);
    $("#confirm_swap_1").removeClass("popup_open");
    $("#confirm_swap_2").removeClass("popup_open");
    $("#wait_purpose").html("Waiting for the swap transaction to finish...");
    if (swapId != 6) {
        $("#wait-popup").addClass("popup_open");
    }
    $("#error-target").html("SWAP");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        swap_Final();
    });
    if (
        $("#planttree").is(":checked") &&
        $("#singleswap_first").html() == "1/<strong>2</strong>"
    ) {
        $("#error-target").html("DONATION");
        $("#wait_purpose").html(
            "Waiting for the donation transaction to finish..."
        );
        await treeTx();
        refreshBalance();
        return;
    }
    if ($("#swap-select-left").val() == "xgt-to-bsc") {
        $("#waittime").html("1 - 5 Minutes");
        if (bridgeStep == 1) {
            await sendXGTtoBSC();
        } else {
            $("#swapPurpose").html("SWAPPED");
            await sendXGTtoBSC_2();
        }
    } else if ($("#swap-select-left").val() == "xgt-to-xdai") {
        $("#waittime").html("1 - 5 Minutes");
        await sendXGTToXDai();
    } else if (swapId == 1) {
        await swapExactXDaiForXGT();
    } else if (swapId == 2) {
        await swapExactXGTForXDai();
    } else if (swapId == 3) {
        await swapXGTForExactXDai();
    } else if (swapId == 4) {
        await swapXDaiForExactXGT();
    } else if (swapId == 5) {
        $("#waittime").html("1 - 5 Minutes");
        await swapDaiForXDai();
    } else if (swapId == 6) {
        $("#waittime").html("1 - 5 Minutes");
        await swapXDaiForDai();
    }
    $("#singleswap_first").html("1/<strong>1</strong>");
    $("#waittime").html("5 - 10 Seconds");
    refreshBalance();
}

async function treeTx() {
    let networkOk = await waitForSwitch(xdaiId, "swap");
    if (!networkOk) {
        return;
    }
    let targetAddress = "0x15B0feDa0ff231E5bCC955f965857d45f366d35E";
    if (window.location.href.indexOf("xion.finance") == -1) {
        targetAddress = selectedAccount;
    }
    try {
        let txReturn = await web3.eth.sendTransaction({
            to: targetAddress,
            from: selectedAccount,
            value: web3.utils.toWei("0.80", "ether"),
        });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $("#donationlink").on("click", function () {
                window.open(txUrlXDai + txReturn.transactionHash, "_blank");
            });
            $('strong[id^="swap-fee"]').html("0.00");
            $("#singleswap_first").html("2/<strong>2</strong>");
            $("#confirm_swap_1").addClass("popup_open");
            return;
        } else {
            $("#error-popup").addClass("popup_open");
            return;
        }
    } catch (e) {
        console.log(e);
        $("#error-popup").addClass("popup_open");
    }
    $("#wait-popup").removeClass("popup_open");
}

async function sendXGTtoBSC() {
    $("#confirm_approval_swap_3step_2").removeClass("popup_open");
    $("#wait_purpose").html(
        "Waiting for the cross chain transaction to finish..."
    );
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("SWAP");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        sendXGTtoBSC();
    });
    await checkConnected();
    let networkOk = await waitForSwitch(xdaiId, "swap");
    if (!networkOk) {
        return;
    }
    let xgtContract = new web3.eth.Contract(abiXGT, addressXGT, null);
    let xgtAmount = new Big($("#swapLeft").val())
        .mul(new Big(10 ** 18))
        .toFixed(0)
        .toString();
    let xgtBalance = await xgtContract.methods
        .balanceOf(selectedAccount)
        .call();
    if (new Big(xgtBalance.toString()).lt(new Big(xgtAmount))) {
        xgtAmount = xgtBalance;
    }
    let bridgeContract = new web3.eth.Contract(
        abiBridge,
        "0xA814DdFd5F5e7259cA3897B5cEAEdB0e087924E3",
        null
    );

    try {
        let txReturn = await bridgeContract.methods
            .outgoingTransfer(xgtAmount.toString(), selectedAccount)
            .send({
                from: selectedAccount,
            });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            while (swapHash == null || swapHash.indexOf("0x") == -1) {
                swapHash = txReturn.transactionHash;
                if (swapHash == null || swapHash.indexOf("0x") == -1) {
                    await sleep(1000);
                }
            }
            let txLogs = await web3xDai.eth.getTransactionReceipt(swapHash);
            swapEncodedData = ("0x" + txLogs.logs[2].data.substring(130)).slice(
                0,
                -22
            );
            localStorage.setItem("CROSS_CHAIN_SWAP", 56);
            localStorage.setItem("CROSS_CHAIN_SWAP_DATA", swapEncodedData);
            $('strong[id^="swap-fee"]').html("0.35");
            bridgeStep = 2;
            $("#confirm_swap_3_3").addClass("popup_open");
            return;
        } else {
            $("#error-popup").addClass("popup_open");
            return;
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e);
    }
    $("#wait-popup").removeClass("popup_open");
}

async function sendXGTtoBSC_2() {
    await checkConnected();
    let networkOk = await waitForSwitch(bscId, "swap");
    if (!networkOk) {
        return;
    }
    $("#confirm_swap_3_3").removeClass("popup_open");
    $("#wait_purpose").html(
        "Waiting for the bridge to sign the transfer...<br>A transaction will pop up any moment, please wait and approve it."
    );
    $("#waittime").html("1 - 5 Minutes");
    let helperContract = new web3xDai.eth.Contract(
        abiAMBHelper,
        addressAMBHelperBSCtoXDAI,
        null
    );
    let signatures = null;
    while (signatures == null || signatures.indexOf("0x") == -1) {
        await sleep(2000);
        try {
            signatures = await helperContract.methods
                .getSignatures(swapEncodedData)
                .call();
        } catch (e) {
            // Do nothing
        }
    }
    let ambContract = new web3.eth.Contract(
        abiAMBMainnet,
        "0x05185872898b6f94AA600177EF41B9334B1FA48B",
        null
    );
    bridgeStep = 0;
    try {
        $("#wait_purpose").html("Waiting for the transaction to finish...");
        $("#waittime").html("Nearly done...");
        let txReturn = await ambContract.methods
            .executeSignatures(swapEncodedData, signatures)
            .send({
                from: selectedAccount,
            });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            localStorage.removeItem("CROSS_CHAIN_SWAP");
            localStorage.removeItem("CROSS_CHAIN_SWAP_DATA");
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrlBSC + txReturn.transactionHash, "_blank");
            });
            $("#swap-xgt-success").addClass("popup_open");
            refreshBalance();
            return;
        } else {
            $("#error-popup").addClass("popup_open");
            return;
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e);
    }
    $("#wait-popup").removeClass("popup_open");
}

async function sendXGTToXDai() {
    let networkOk = await waitForSwitch(bscId, "cross-chain swap");
    if (!networkOk) {
        return;
    }
    let xgtContract = new web3.eth.Contract(abiBridge, addressXGT, null);
    let xgtAmount = new Big($("#swapLeft").val())
        .mul(new Big(10 ** 18))
        .toFixed(0)
        .toString();
    let xgtBalance = await xgtContract.methods
        .balanceOf(selectedAccount)
        .call();
    if (new Big(xgtBalance.toString()).lt(new Big(xgtAmount))) {
        xgtAmount = xgtBalance;
    }
    try {
        let txReturn = await xgtContract.methods
            .outgoingTransfer(xgtAmount.toString(), selectedAccount)
            .send({
                from: selectedAccount,
            });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrlBSC + txReturn.transactionHash, "_blank");
            });
            $("#swapPurpose").html("SWAPPED");
            $("#swap-xgt-success").addClass("popup_open");
            refreshBalance();
            return;
        } else {
            $("#error-popup").addClass("popup_open");
            return;
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e);
    }
    $("#wait-popup").removeClass("popup_open");
}

async function swapDaiForXDai() {
    let daiContract = new web3.eth.Contract(abiDAI, addressDAI, null);

    // ///////////////
    // const message = {
    //     holder: selectedAccount,
    //     spender: addressXGTStakeMainnet,
    //     nonce: parseInt((await daiContract.methods.nonces(selectedAccount).call()).toString()),
    //     expiry: Math.round(new Date().getTime() / 1000) + 60 * 60,
    //     allowed: true,
    // };
    // const typedData = JSON.stringify({
    //     types: {
    //         EIP712Domain: [{
    //                 name: "name",
    //                 type: "string",
    //             },
    //             {
    //                 name: "version",
    //                 type: "string",
    //             },
    //             {
    //                 name: "chainId",
    //                 type: "uint256",
    //             },
    //             {
    //                 name: "verifyingContract",
    //                 type: "address",
    //             },
    //         ],
    //         Permit: [{
    //                 name: "holder",
    //                 type: "address",
    //             },
    //             {
    //                 name: "spender",
    //                 type: "address",
    //             },
    //             {
    //                 name: "nonce",
    //                 type: "uint256",
    //             },
    //             {
    //                 name: "expiry",
    //                 type: "uint256",
    //             },
    //             {
    //                 name: "allowed",
    //                 type: "bool",
    //             },
    //         ],
    //     },
    //     primaryType: "Permit",
    //     domain: {
    //         name: "Dai Stablecoin",
    //         version: "1",
    //         chainId: 1,
    //         verifyingContract: addressDAI,
    //     },
    //     message: message,
    // });

    // await web3.currentProvider.send({
    //         jsonrpc: "2.0",
    //         id: 999999999999,
    //         method: "eth_signTypedData_v4",
    //         params: [selectedAccount, typedData]
    //     },
    //     async function (error, response) {
    //         if (error || (response && response.error)) {
    //             console.log(error)
    //             return
    //         } else if (response && response.result) {
    //             const r = response.result.slice(0, 66);
    //             const s = "0x" + response.result.slice(66, 130);
    //             const v = Number("0x" + response.result.slice(130, 132));
    //             console.log(r)
    //             console.log(s)
    //             console.log(v)
    //         }
    //     }
    // );

    ///////////////
    let daiAmount = new Big($("#swapLeft").val())
        .mul(new Big(10 ** decimalsDai))
        .toFixed(0)
        .toString();
    let daiBalance = await daiContract.methods
        .balanceOf(selectedAccount)
        .call();
    if (new Big(daiBalance.toString()).lt(new Big(daiAmount))) {
        daiAmount = daiBalance;
    }
    try {
        let txReturn = await daiContract.methods
            .transfer(addressDAIBridgeMainnet, daiAmount.toString())
            .send({
                from: selectedAccount,
            });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrlMainnet + txReturn.transactionHash, "_blank");
            });
            $("#swap-success").addClass("popup_open");
            refreshBalance();
            return;
        } else {
            $("#error-popup").addClass("popup_open");
            return;
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e);
    }
    $("#wait-popup").removeClass("popup_open");
}

async function swapXDaiForDai() {
    let networkOk = await waitForSwitch(mainnetId, "swap");
    if (!networkOk) {
        return;
    }
    $("#wait-popup").addClass("popup_open");
    let helperContract = new web3xDai.eth.Contract(
        abiXDaiHelper,
        addressXDaiHelper,
        null
    );
    let xDaiAmount = web3xDai.utils.toWei($("#swapRight").val(), "ether");
    try {
        let txReturn;
        if (withdrawHash.length > 0) {
            let messageHash = await helperContract.methods
                .getMessageHash(selectedAccount, xDaiAmount, withdrawHash)
                .call();
            let message = "";
            while (message.length == 0) {
                message = await helperContract.methods
                    .getMessage(messageHash)
                    .call();
                if (typeof message == "undefined" || message.length == 0) {
                    await sleep(2000);
                }
            }
            let signatures = "";
            while (signatures.length == 0) {
                signatures = await helperContract.methods
                    .getSignatures(messageHash)
                    .call();
                if (
                    typeof signatures == "undefined" ||
                    signatures.length == 0
                ) {
                    await sleep(1000);
                }
            }
            let bridgeContract = new web3.eth.Contract(
                abiDAIBridgeMainnet,
                addressDAIBridgeMainnet,
                null
            );
            txReturn = await bridgeContract.methods
                .executeSignatures(message, signatures)
                .send({
                    from: selectedAccount,
                });
        }
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrlMainnet + txReturn.transactionHash, "_blank");
            });
            $("#swap-success").addClass("popup_open");
            refreshBalance();
            return;
        } else {
            $("#error-popup").addClass("popup_open");
            return;
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e);
    }
    $("#wait-popup").removeClass("popup_open");
}

async function swapExactXDaiForXGT() {
    let thisRouterAddress = addressRouter;
    let baseAmount = web3.utils.toWei($("#swapLeft").val(), "ether");
    let baseBalance = gBalanceXDai;
    let deductAmount = 0.01;
    let path = [addressWETHXDAI, addressXGT];
    let txUrl = txUrlXDai;
    if (selectedNetwork == "ETH") {
        thisRouterAddress = addressRouterETH;
        deductAmount = 0.025;
        path = [addressWETHETH, addressXGT];
        txUrl = txUrlMainnet;
    } else if (selectedNetwork == "BSC") {
        thisRouterAddress = addressRouterBSC;
        path = [addressWETHBSC, addressXGTBSC];
        txUrl = txUrlBSC;
    }

    let routerContract = new web3.eth.Contract(
        abiRouter,
        thisRouterAddress,
        null
    );
    if (
        web3.utils.toWei(baseBalance.toString(), "ether") <=
        parseFloat(baseAmount)
    ) {
        baseAmount = web3.utils.toWei(
            (baseBalance - deductAmount).toString(),
            "ether"
        );
    }
    let rate = await routerContract.methods
        .getAmountsOut(baseAmount, path)
        .call();
    let xgtAmount = new Big(rate[1])
        .mul(new Big(1 - parseFloat($("#slippage").val()) / 100))
        .toFixed(0)
        .toString();
    try {
        let txReturn = await routerContract.methods
            .swapExactETHForTokens(
                xgtAmount,
                path,
                selectedAccount,
                Math.round(new Date().getTime() / 1000) + 60 * 60
            )
            .send({
                from: selectedAccount,
                value: baseAmount,
            });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrl + txReturn.transactionHash, "_blank");
            });
            if ($("#planttree").is(":checked")) {
                $("#swap-success-w-tree").addClass("popup_open");
            } else {
                $("#swap-success").addClass("popup_open");
            }
            refreshBalance();
            return;
        } else {
            $("#error-popup").addClass("popup_open");
            return;
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e);
    }
    $("#wait-popup").removeClass("popup_open");
}

async function earnMeta() {
    let networkOk = await waitForSwitch(mainnetId, "earn");
    if (!networkOk) {
        return;
    }
    $("#confirm_earn_1").removeClass("popup_open");
    $("#confirm_earn_2").removeClass("popup_open");
    $("#wait_purpose").html("Waiting for the earn transaction to finish...");
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("EARNING");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        earnMeta();
    });
    refreshBalance();
    let amount = new Big($("#earn-input").val()).mul(
        new Big(10 ** decimalsDai)
    );
    if (parseFloat(gBalanceDAI - parseFloat($("#earn-input").val())) <= 0.1) {
        let daiContract = new web3.eth.Contract(abiDAI, addressDAI, null);
        amount = await daiContract.methods.balanceOf(selectedAccount).call();
    }

    let XGTStakeMainnetContract = new web3.eth.Contract(
        abiXGTStakeMainnet,
        addressXGTStakeMainnet,
        null
    );
    let XGTStakeMainnetContractEIP712 = new web3.eth.Contract(
        abiEIP712,
        addressXGTStakeMainnet,
        null
    );
    try {
        let nonce = await XGTStakeMainnetContractEIP712.methods
            .getNonce(selectedAccount)
            .call();
        let functionSignature = await XGTStakeMainnetContract.methods
            .depositTokens(amount.toString())
            .encodeABI();

        let txMessage = {};
        txMessage.nonce = parseInt(nonce);
        txMessage.from = selectedAccount;
        txMessage.functionSignature = functionSignature;

        const dataToSign = JSON.stringify({
            types: {
                EIP712Domain: domainType,
                MetaTransaction: metaTransactionType,
            },
            domain: domainData,
            primaryType: "MetaTransaction",
            message: txMessage,
        });
        await web3.currentProvider.send(
            {
                jsonrpc: "2.0",
                id: 999999999999,
                method: "eth_signTypedData_v4",
                params: [selectedAccount, dataToSign],
            },
            async function (error, response) {
                if (error || (response && response.error)) {
                    $("#wait-popup").removeClass("popup_open");
                    $("#error-popup").addClass("popup_open");
                    return;
                } else if (response && response.result) {
                    let {r, s, v} = getSignatureParameters(response.result);
                    const url = metaTxAPI;
                    const data = {
                        ContractAddress: addressXGTStakeMainnet,
                        UserAddress: selectedAccount,
                        FunctionSignature: functionSignature,
                        SigR: r,
                        SigS: s,
                        SigV: v,
                    };
                    const other_params = {
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify(data),
                        method: "POST",
                    };
                    fetch(url, other_params)
                        .then((response) => response.json())
                        .then((json) => {
                            console.log(json);
                            if (json.Status == "ok") {
                                $("#wait-popup").removeClass("popup_open");
                                $('[id^="txlink"]')
                                    .prop("onclick", null)
                                    .off("click");
                                $('[id^="txlink"]').on("click", function () {
                                    window.open(
                                        txUrlMainnet + json.TxHash,
                                        "_blank"
                                    );
                                });
                                $("#earn-success").addClass("popup_open");
                                return;
                            } else {
                                $("#error-popup").addClass("popup_open");
                            }
                        });
                }
            }
        );
    } catch (e) {
        $("#wait-popup").removeClass("popup_open");
        $("#error-popup").addClass("popup_open");
        console.log(e);
    }
}

async function claimMeta(networkId) {
    let networkOk = await waitForSwitch(bscId, "claim");
    if (!networkOk) {
        return;
    }
    $("#error-target").html("CLAIMING");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        claimMeta(networkId);
    });
    refreshBalance();

    let xgtRewardChest = new web3xDai.eth.Contract(
        abiRewardChest,
        addressRewardChest,
        null
    );
    let xgtRewardChestEIP712 = new web3xDai.eth.Contract(
        abiEIP712,
        addressRewardChest,
        null
    );
    try {
        let nonce = await xgtRewardChestEIP712.methods
            .getNonce(selectedAccount)
            .call();
        let functionSignature = await xgtRewardChest.methods
            .claimToNetwork(networkId)
            .encodeABI();

        let txMessage = {};
        txMessage.nonce = parseInt(nonce);
        txMessage.from = selectedAccount;
        txMessage.functionSignature = functionSignature;

        const dataToSign = JSON.stringify({
            types: {
                EIP712Domain: domainType,
                MetaTransaction: metaTransactionType,
            },
            domain: domainData,
            primaryType: "MetaTransaction",
            message: txMessage,
        });
        await web3.currentProvider.send(
            {
                jsonrpc: "2.0",
                id: 999999999999,
                method: "eth_signTypedData_v4",
                params: [selectedAccount, dataToSign],
            },
            async function (error, response) {
                if (error || (response && response.error)) {
                    $("#wait-popup").removeClass("popup_open");
                    $("#error-popup").addClass("popup_open");
                    return;
                } else if (response && response.result) {
                    let {r, s, v} = getSignatureParameters(response.result);
                    const url = metaTxAPI;
                    const data = {
                        ContractAddress: addressRewardChest,
                        UserAddress: selectedAccount,
                        FunctionSignature: functionSignature,
                        SigR: r,
                        SigS: s,
                        SigV: v,
                    };
                    const other_params = {
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify(data),
                        method: "POST",
                    };
                    await fetch(url, other_params)
                        .then((response) => response.json())
                        .then(async (json) => {
                            if (json.Status == "ok") {
                                let txLogs =
                                    await web3xDai.eth.getTransactionReceipt(
                                        json.TxHash
                                    );
                                while (txLogs == null) {
                                    txLogs =
                                        await web3xDai.eth.getTransactionReceipt(
                                            json.TxHash
                                        );
                                    if (txLogs == null) {
                                        await sleep(1000);
                                    }
                                }
                                swapEncodedData = (
                                    "0x" + txLogs.logs[3].data.substring(130)
                                ).slice(0, -22);
                                localStorage.setItem("CROSS_CHAIN_SWAP", 56);
                                localStorage.setItem(
                                    "CROSS_CHAIN_SWAP_DATA",
                                    swapEncodedData
                                );
                                $('strong[id^="swap-fee"]').html("0.35");
                                bridgeStep = 2;
                                $("#wait-popup").addClass("popup_open");
                                $("#swapPurpose").html("CLAIMED");
                                await sendXGTtoBSC_2();
                                return;
                            } else {
                                $("#error-popup").addClass("popup_open");
                            }
                        });
                }
            }
        );
    } catch (e) {
        $("#wait-popup").removeClass("popup_open");
        $("#error-popup").addClass("popup_open");
        console.log(e);
    }
}

async function withdrawMeta() {
    $("#confirm_withdraw_1").removeClass("popup_open");
    $("#confirm_withdraw_2").removeClass("popup_open");
    $("#confirm_withdraw_2_1_all").removeClass("popup_open");
    $("#confirm_withdraw_2_2_all").removeClass("popup_open");
    $("#confirm_withdraw_3_2_all").removeClass("popup_open");
    $("#confirm_withdraw_3_3_all").removeClass("popup_open");
    let networkOk = await waitForSwitch(mainnetId, "withdraw");
    if (!networkOk) {
        return;
    }
    $("#wait_purpose").html(
        "Waiting for the withdraw transaction to finish..."
    );
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("WITHDRAW");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        withdraw();
    });
    let amount = parseFloat($("#withdraw-input").val()).toFixed(2);

    refreshBalance();

    if (parseFloat(stakeValue.toString()) - amount <= 0.15) {
        amount = web3.utils
            .toBN(2)
            .pow(web3.utils.toBN(256))
            .sub(web3.utils.toBN(1));
    } else {
        amount = new Big(amount.toString())
            .mul(new Big(10 ** decimalsDai))
            .toFixed(0)
            .toString();
    }
    let XGTStakeMainnetContract = new web3.eth.Contract(
        abiXGTStakeMainnet,
        addressXGTStakeMainnet,
        null
    );

    let XGTStakeMainnetContractEIP712 = new web3.eth.Contract(
        abiEIP712,
        addressXGTStakeMainnet,
        null
    );
    try {
        let nonce = await XGTStakeMainnetContractEIP712.methods
            .getNonce(selectedAccount)
            .call();
        let functionSignature = await XGTStakeMainnetContract.methods
            .withdrawTokens(amount.toString())
            .encodeABI();

        let txMessage = {};
        txMessage.nonce = parseInt(nonce);
        txMessage.from = selectedAccount;
        txMessage.functionSignature = functionSignature;

        const dataToSign = JSON.stringify({
            types: {
                EIP712Domain: domainType,
                MetaTransaction: metaTransactionType,
            },
            domain: domainData,
            primaryType: "MetaTransaction",
            message: txMessage,
        });
        await web3.currentProvider.send(
            {
                jsonrpc: "2.0",
                id: 999999999999,
                method: "eth_signTypedData_v4",
                params: [selectedAccount, dataToSign],
            },
            async function (error, response) {
                if (error || (response && response.error)) {
                    $("#wait-popup").removeClass("popup_open");
                    $("#error-popup").addClass("popup_open");
                    return;
                } else if (response && response.result) {
                    let {r, s, v} = getSignatureParameters(response.result);
                    const url = metaTxAPI;
                    const data = {
                        ContractAddress: addressXGTStakeMainnet,
                        UserAddress: selectedAccount,
                        FunctionSignature: functionSignature,
                        SigR: r,
                        SigS: s,
                        SigV: v,
                    };
                    const other_params = {
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify(data),
                        method: "POST",
                    };
                    fetch(url, other_params)
                        .then((response) => response.json())
                        .then((json) => {
                            console.log(json);
                            if (json.Status == "ok") {
                                console.log("DIS");
                                $("#wait-popup").removeClass("popup_open");
                                $('[id^="txlink"]')
                                    .prop("onclick", null)
                                    .off("click");
                                $('[id^="txlink"]').on("click", function () {
                                    window.open(
                                        txUrlMainnet + json.TxHash,
                                        "_blank"
                                    );
                                });
                                $("#withdraw-success").addClass("popup_open");
                                return;
                            } else {
                                $("#error-popup").addClass("popup_open");
                            }
                        });
                }
            }
        );
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e);
    }
    $("#wait-popup").removeClass("popup_open");
    $("#withdraw-input").val("");
}

function getSignatureParameters(signature) {
    if (!web3.utils.isHexStrict(signature)) {
        throw new Error(
            'Given value "'.concat(signature, '" is not a valid hex string.')
        );
    }
    var r = signature.slice(0, 66);
    var s = "0x".concat(signature.slice(66, 130));
    var v = "0x".concat(signature.slice(130, 132));
    v = web3.utils.hexToNumber(v);
    if (![27, 28].includes(v)) v += 27;
    return {
        r: r,
        s: s,
        v: v.toString(16),
    };
}

async function swapXDaiForExactXGT() {
    let thisRouterAddress = addressRouter;
    let path = [addressWETHXDAI, addressXGT];
    let txUrl = txUrlXDai;
    if (selectedNetwork == "ETH") {
        thisRouterAddress = addressRouterETH;
        path = [addressWETHETH, addressXGT];
        txUrl = txUrlMainnet;
    } else if (selectedNetwork == "BSC") {
        thisRouterAddress = addressRouterBSC;
        path = [addressWETHBSC, addressXGTBSC];
        txUrl = txUrlBSC;
    }

    let routerContract = new web3.eth.Contract(
        abiRouter,
        thisRouterAddress,
        null
    );
    let xgtAmount = web3.utils.toWei(
        parseFloat((parseFloat($("#swapRight").val()) * 1000) / 970).toString(),
        "ether"
    );
    let rate = await routerContract.methods
        .getAmountsIn(web3.utils.toWei($("#swapRight").val(), "ether"), path)
        .call();
    currentLeft = new Big(rate[0])
        .mul(new Big(1 + parseFloat($("#slippage").val()) / 100))
        .toFixed(0);
    try {
        let txReturn = await routerContract.methods
            .swapETHForExactTokens(
                xgtAmount,
                path,
                selectedAccount,
                Math.round(new Date().getTime() / 1000) + 60 * 60
            )
            .send({
                from: selectedAccount,
                value: currentLeft.toString(),
            });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrl + txReturn.transactionHash, "_blank");
            });
            if ($("#planttree").is(":checked")) {
                $("#swap-success-w-tree").addClass("popup_open");
            } else {
                $("#swap-success").addClass("popup_open");
            }
            refreshBalance();
            return;
        } else {
            $("#error-popup").addClass("popup_open");
            return;
        }
    } catch (e) {
        console.log(e);
    }
    $("#wait-popup").removeClass("popup_open");
}

async function swapExactXGTForXDai() {
    let thisRouterAddress = addressRouter;
    let thisXGTAddress = addressXGT;
    let path = [addressXGT, addressWETHXDAI];
    let txUrl = txUrlXDai;
    if (selectedNetwork == "ETH") {
        thisRouterAddress = addressRouterETH;
        path = [addressXGT, addressWETHETH];
        txUrl = txUrlMainnet;
    } else if (selectedNetwork == "BSC") {
        thisRouterAddress = addressRouterBSC;
        path = [addressXGTBSC, addressWETHBSC];
        txUrl = txUrlBSC;
        thisXGTAddress = addressXGTBSC;
    }

    let routerContract = new web3.eth.Contract(
        abiRouter,
        thisRouterAddress,
        null
    );
    let xgtContract = new web3.eth.Contract(abiXGT, thisXGTAddress, null);
    let xgtBalance = await xgtContract.methods
        .balanceOf(selectedAccount)
        .call();
    let xgtAmount = web3.utils.toWei($("#swapLeft").val(), "ether");
    if (new Big(xgtBalance.toString()).lt(new Big(xgtAmount.toString()))) {
        xgtAmount = xgtBalance;
    }
    console.log(xgtAmount);
    if (new Big(xgtBalance).sub(xgtAmount).lt(new Big(10 ** 17))) {
        xgtAmount = xgtBalance;
    }
    console.log(xgtAmount);
    let rate = await routerContract.methods
        .getAmountsOut(xgtAmount, path)
        .call();
    let xDaiAmount = new Big(rate[1])
        .mul(new Big(1 - parseFloat($("#slippage").val()) / 100))
        .toFixed(0)
        .toString();
    try {
        let txReturn = await routerContract.methods
            .swapExactTokensForETH(
                xgtAmount,
                xDaiAmount,
                path,
                selectedAccount,
                Math.round(new Date().getTime() / 1000) + 60 * 60
            )
            .send({
                from: selectedAccount,
            });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrl + txReturn.transactionHash, "_blank");
            });
            $("#swap-success").addClass("popup_open");
            refreshBalance();
            return;
        } else {
            $("#error-popup").addClass("popup_open");
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e);
    }
    $("#wait-popup").removeClass("popup_open");
}

async function swapXGTForExactXDai() {
    let thisRouterAddress = addressRouter;
    let thisXGTAddress = addressXGT;
    let path = [addressXGT, addressWETHXDAI];
    let txUrl = txUrlXDai;
    if (selectedNetwork == "ETH") {
        thisRouterAddress = addressRouterETH;
        path = [addressXGT, addressWETHETH];
        txUrl = txUrlMainnet;
    } else if (selectedNetwork == "BSC") {
        thisRouterAddress = addressRouterBSC;
        path = [addressXGTBSC, addressWETHBSC];
        txUrl = txUrlBSC;
        thisXGTAddress = addressXGTBSC;
    }

    let routerContract = new web3.eth.Contract(
        abiRouter,
        thisRouterAddress,
        null
    );
    let xgtContract = new web3.eth.Contract(abiXGT, thisXGTAddress, null);
    let xgtBalance = await xgtContract.methods
        .balanceOf(selectedAccount)
        .call();

    let xDaiAmount = web3.utils.toWei(
        parseFloat((parseFloat($("#swapRight").val()) * 1000) / 970).toString(),
        "ether"
    );
    let rate = await routerContract.methods
        .getAmountsIn(web3.utils.toWei($("#swapRight").val(), "ether"), path)
        .call();
    currentLeft = rate[0];
    let xgtAmount = web3.utils.toWei(
        new Big(rate[0])
            .mul(new Big(1 + parseFloat($("#slippage").val()) / 100))
            .toFixed(0)
            .toString(),
        "ether"
    );
    if (new Big(xgtBalance.toString()).lt(new Big(xgtAmount.toString()))) {
        xgtAmount = xgtBalance;
    }
    try {
        let txReturn = await routerContract.methods
            .swapTokensForExactETH(
                xDaiAmount,
                xgtAmount,
                path,
                selectedAccount,
                Math.round(new Date().getTime() / 1000) + 60 * 60
            )
            .send({
                from: selectedAccount,
            });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrl + txReturn.transactionHash, "_blank");
            });
            $("#swap-success").addClass("popup_open");
            refreshBalance();
            return;
        } else {
            $("#error-popup").addClass("popup_open");
            return;
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e);
    }
    $("#wait-popup").removeClass("popup_open");
}

async function getRateFixedLeft() {
    if ($("#swap-select-left").val() == "xgt-to-mainnet") {
        $("#swapRight").val($("#swapLeft").val() + " XGT to Mainnet");
        if (parseFloat($("#swapLeft").val()) > gBalanceXGTXDai) {
            $("#swapLeft").addClass("redInput");
        } else {
            $("#swapLeft").removeClass("redInput");
        }
        return;
    } else if ($("#swap-select-left").val() == "xgt-to-xdai") {
        $("#swapRight").val($("#swapLeft").val() + " XGT to xDai");
        if (parseFloat($("#swapLeft").val()) > gBalanceXGTBSC) {
            $("#swapLeft").addClass("redInput");
        } else {
            $("#swapLeft").removeClass("redInput");
        }
        return;
    } else if ($("#swap-select-left").val() == "xgt-to-bsc") {
        $("#swapRight").val($("#swapLeft").val() + " XGT to BSC");
        if (parseFloat($("#swapLeft").val()) > gBalanceXGTXDai) {
            $("#swapLeft").addClass("redInput");
        } else {
            $("#swapLeft").removeClass("redInput");
        }
        return;
    }
    fixedLeft = true;
    let baseValue = gBalanceXDai;
    let baseXGT = gBalanceXGTXDai;
    let routerContract;
    if (selectedNetwork == "ETH") {
        routerContract = new web3Mainnet.eth.Contract(
            abiRouter,
            addressRouterETH,
            null
        );
        baseValue = gBalanceETH;
        baseXGT = gBalanceXGTETH;
    } else if (selectedNetwork == "BSC") {
        routerContract = new web3bsc.eth.Contract(
            abiRouter,
            addressRouterBSC,
            null
        );
        baseValue = gBalanceBNB;
        baseXGT = gBalanceXGTBSC;
    } else {
        routerContract = new web3xDai.eth.Contract(
            abiRouter,
            addressRouter,
            null
        );
    }
    if (
        ($("#swap-select-left").val() == "dai" &&
            $("#swap-select-right").val() == "xdai") ||
        ($("#swap-select-left").val() == "xdai" &&
            $("#swap-select-right").val() == "dai")
    ) {
        $("#swapRight").val($("#swapLeft").val());
        if (
            $("#swap-select-left").val() == "dai" &&
            gBalanceDAI < parseFloat($("#swapLeft").val()).toFixed(2)
        ) {
            $("#swapLeft").addClass("redInput");
        } else {
            $("#swapLeft").removeClass("redInput");
        }
    } else if ($("#swap-select-right").val() == "xgt") {
        let path = [addressWETHXDAI, addressXGT];
        if (selectedNetwork == "ETH") {
            path = [addressWETHETH, addressXGT];
        } else if (selectedNetwork == "BSC") {
            path = [addressWETHBSC, addressXGTBSC];
        }
        let baseAmount = web3xDai.utils.toWei($("#swapLeft").val(), "ether");
        if (baseValue < parseFloat($("#swapLeft").val())) {
            // $("#swapRight").addClass("redInput");
            $("#swapLeft").addClass("redInput");
        } else {
            // $("#swapRight").removeClass("redInput");
            $("#swapLeft").removeClass("redInput");
        }
        let rate = await routerContract.methods
            .getAmountsOut(baseAmount, path)
            .call();
        currentRight = rate[1];
        $("#swapRight").val(
            parseFloat(web3xDai.utils.fromWei(currentRight)).toFixed(2)
        );
    } else if ($("#swap-select-left").val() == "xgt") {
        // console.log($("#swapLeft").val())
        // let indexXGT = ($("#swapLeft").val()).indexOf(" XGT");
        // console.log(indexXGT)
        // let xgtAmount;
        // if (indexXGT > -1) {
        //     xgtAmount = web3xDai.utils.toWei($("#swapLeft").val().substr(0, indexXGT - 1), "ether");
        // } else {
        //     xgtAmount = web3xDai.utils.toWei($("#swapLeft").val(), "ether");
        // }
        let xgtAmount = web3xDai.utils.toWei($("#swapLeft").val(), "ether");

        // $("#swapLeft").val($("#swapLeft").val + " XGT ($" + $("#swapLeft").val() + ")")
        if (baseXGT < parseFloat($("#swapLeft").val()).toFixed(2)) {
            // $("#swapRight").addClass("redInput");
            $("#swapLeft").addClass("redInput");
        } else {
            // $("#swapRight").removeClass("redInput");
            $("#swapLeft").removeClass("redInput");
        }
        let path = [addressXGT, addressWETHXDAI];
        if (selectedNetwork == "ETH") {
            path = [addressXGT, addressWETHETH];
        } else if (selectedNetwork == "BSC") {
            path = [addressXGTBSC, addressWETHBSC];
        }
        let rate = await routerContract.methods
            .getAmountsOut(xgtAmount, path)
            .call();
        currentRight = rate[1];
        $("#swapRight").val(
            parseFloat(web3xDai.utils.fromWei(currentRight)).toFixed(2)
        );
    } else if (
        $("#swap-select-left").val() == "usd" &&
        $("#swap-select-right").val() == "eth"
    ) {
        $("#swapRight").val(
            parseFloat(parseFloat($("#swapLeft").val()) / ethPrice).toFixed(4)
        );
    } else {
        $("#swapRight").val($("#swapLeft").val());
    }
}

async function getRateFixedRight() {
    fixedLeft = false;
    let routerContract;
    if (selectedNetwork == "BSC") {
        routerContract = new web3bsc.eth.Contract(
            abiRouter,
            addressRouterBSC,
            null
        );
    } else {
        routerContract = new web3xDai.eth.Contract(
            abiRouter,
            addressRouter,
            null
        );
    }
    if (
        ($("#swap-select-left").val() == "dai" &&
            $("#swap-select-right").val() == "xdai") ||
        ($("#swap-select-left").val() == "xdai" &&
            $("#swap-select-right").val() == "dai")
    ) {
        $("#swapLeft").val($("#swapRight").val());
        if (
            $("#swap-select-left").val() == "dai" &&
            gBalanceDAI < parseFloat($("#swapLeft").val()).toFixed(2)
        ) {
            $("#swapLeft").addClass("redInput");
        } else {
            $("#swapLeft").removeClass("redInput");
        }
    } else if (
        $("#swap-select-left").val() == "usd" &&
        $("#swap-select-right").val() == "eth"
    ) {
        $("#swapLeft").val(
            parseFloat(parseFloat($("#swapRight").val()) * ethPrice).toFixed(2)
        );
    } else if ($("#swap-select-left").val() != "xgt") {
        if (selectedNetwork == "xDAI") {
            let xgtAmount = web3xDai.utils.toWei(
                new Big($("#swapRight").val()).toFixed(6).toString(),
                "ether"
            );

            let rate = await routerContract.methods
                .getAmountsIn(xgtAmount, [addressWETHXDAI, addressXGT])
                .call();
            currentLeft = rate[0];
            if (
                gBalanceXDai <
                parseFloat(web3xDai.utils.fromWei(currentLeft)).toFixed(2)
            ) {
                // currentLeft = gBalanceXDai;
                // $("#swapLeft").val(currentLeft);
                // getRateFixedLeft();
                // return;
                // $("#swapRight").addClass("redInput");
                $("#swapLeft").addClass("redInput");
            } else {
                // $("#swapRight").removeClass("redInput");
                $("#swapLeft").removeClass("redInput");
            }
            $("#swapLeft").val(
                parseFloat(web3xDai.utils.fromWei(currentLeft)).toFixed(2)
            );
        } else if (selectedNetwork == "BSC") {
            let xgtAmount = web3bsc.utils.toWei(
                new Big($("#swapRight").val()).toFixed(6).toString(),
                "ether"
            );

            let rate = await routerContract.methods
                .getAmountsIn(xgtAmount, [addressWETHBSC, addressXGT])
                .call();
            currentLeft = rate[0];
            if (
                gBalanceBNB <
                parseFloat(web3bsc.utils.fromWei(currentLeft)).toFixed(2)
            ) {
                // currentLeft = gBalanceXDai;
                // $("#swapLeft").val(currentLeft);
                // getRateFixedLeft();
                // return;
                // $("#swapRight").addClass("redInput");
                $("#swapLeft").addClass("redInput");
            } else {
                // $("#swapRight").removeClass("redInput");
                $("#swapLeft").removeClass("redInput");
            }
            $("#swapLeft").val(
                parseFloat(web3xDai.utils.fromWei(currentLeft)).toFixed(2)
            );
        }
    } else {
        if (selectedNetwork == "xDAI") {
            let daiAmount = web3xDai.utils.toWei(
                $("#swapRight").val(),
                "ether"
            );

            let rate = await routerContract.methods
                .getAmountsIn(daiAmount, [addressXGT, addressWETHXDAI])
                .call();
            currentLeft = rate[0];
            if (
                gBalanceXGTXDai <
                parseFloat(web3xDai.utils.fromWei(currentLeft)).toFixed(2)
            ) {
                // currentLeft = gBalanceXGTXDai;
                // $("#swapLeft").val(currentLeft);
                // getRateFixedLeft();
                // return;
                // $("#swapRight").addClass("redInput");
                $("#swapLeft").addClass("redInput");
            } else {
                // $("#swapRight").removeClass("redInput");
                $("#swapLeft").removeClass("redInput");
            }
            $("#swapLeft").val(
                parseFloat(web3xDai.utils.fromWei(currentLeft)).toFixed(2)
            );
        } else if (selectedNetwork == "BSC") {
            let bnbAmount = web3bsc.utils.toWei($("#swapRight").val(), "ether");

            let rate = await routerContract.methods
                .getAmountsIn(bnbAmount, [addressXGT, addressWETHBSC])
                .call();
            currentLeft = rate[0];
            if (
                gBalanceXGTBSC <
                parseFloat(web3xDai.utils.fromWei(currentLeft)).toFixed(2)
            ) {
                // currentLeft = gBalanceXGTXDai;
                // $("#swapLeft").val(currentLeft);
                // getRateFixedLeft();
                // return;
                // $("#swapRight").addClass("redInput");
                $("#swapLeft").addClass("redInput");
            } else {
                // $("#swapRight").removeClass("redInput");
                $("#swapLeft").removeClass("redInput");
            }
            $("#swapLeft").val(
                parseFloat(web3xDai.utils.fromWei(currentLeft)).toFixed(2)
            );
        }
    }
}

async function removeLiquidity(amount) {
    let poolTokenContract = new web3.eth.Contract(abiPair, addressPair, null);
    let routerContract = new web3.eth.Contract(abiRouter, addressRouter, null);

    let poolBalance = await poolTokenContract.methods
        .balanceOf(selectedAccount)
        .call();
    let allowance = await poolTokenContract.methods
        .allowance(selectedAccount, addressRouter)
        .call();
    let desiredAmount = web3.utils.toWei(amount.toString(), "ether");

    if (new Big(desiredAmount).gt(new Big(poolBalance))) {
        desiredAmount = poolBalance;
    }
    if (new Big(desiredAmount).eq(new Big(0))) {
        return;
    }

    if (new Big(desiredAmount).gt(new Big(allowance))) {
        let difference = new Big(desiredAmount).minus(new Big(allowance));
        await poolTokenContract.methods
            .approve(addressRouter, difference.toString())
            .send({
                from: selectedAccount,
            });
    }

    await routerContract.methods
        .removeLiquidityETH(
            addressXGT,
            desiredAmount,
            0,
            0,
            selectedAccount,
            Math.round(new Date().getTime() / 1000) + 60 * 60
        )
        .send({
            from: selectedAccount,
        });
}

async function payout() {
    $("#newpopup").addClass("popup_open");
}
/**
 * Connect wallet button pressed.
 */
async function onConnect() {
    try {
        if (web3Modal.providerController.cachedProvider == "torus") {
            $(".preloader").css("z-index", 9999);
        }
        provider = await web3Modal.connect();
        if (web3Modal.providerController.cachedProvider == "torus") {
            $(".preloader").css("z-index", 999999999999999);
        }
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        // Refresh connection
        onDisconnect();
        await sleep(1000);
        $("#connect-wallet").text("CONNECT");
        localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
        web3Modal.clearCachedProvider();
        provider = null;

        if (selectedNetwork == "xDAI") {
            $("#currency-name-balance").html("xDAI");
        } else if (selectedNetwork == "ETH") {
            $("#currency-name-balance").html("ETH");
        } else if (selectedNetwork == "BSC") {
            $("#currency-name-balance").html("BNB");
        }
        if (nativeCurrency) {
            $("#balance-currency").html('<i id="balance">0.00</i>');
            $("#xgt-currency").html('<i id="xgt-balance">0.00</i>');
            $("#xgt-currency-shop").html(
                '<b><span id="xgt-balance">0.00</span></b>'
            );
        } else {
            $("#balance-currency").html('$ <i id="balance">0.00</i>');
            $("#xgt-currency").html('$ <i id="xgt-balance">0.00</i>');
            $("#xgt-currency-shop").html(
                '$ <b><span id="xgt-balance">0.00</span></b>'
            );
        }
        $("#balance").html("0.00");
        $("#earnings").html("0.00");
        $("#xgt-balance").html("0.00");
        $(".preloader").hide();
        // Refresh End
        return;
    }
    $(".preloader").show();
    INIT_DONE = true;
    if (firstConnect) {
        $(".preloader").hide();
        $("#connect-success").addClass("popup_open");
    }
    // Subscribe to accounts change
    provider.on("accountsChanged", async (accounts) => {
        await fetchAccountData();
        refreshBalance();
    });

    // Subscribe to chainId change
    provider.on("chainChanged", async (chainId) => {
        await fetchAccountData();
        refreshBalance();
    });
    await refreshAccountData();
    refreshBalance();
}

async function getNFTMintingRights() {
    let nftContract = new web3bsc.eth.Contract(
        abiNFTChest,
        "0x60c1b9f4c8e271740f23986dc4c02ddf3daae2cf",
        null
    );
    let totalMinted = await nftContract.methods.totalSupply().call();
    $("#minted_total").html(totalMinted + " / 9000");
    if (selectedAccount != null) {
        let mintAllowance = await nftContract.methods
            .mintAllowancePerUser(selectedAccount)
            .call();

        if (parseFloat(mintAllowance) > 0) {
            $("#mint-nft").removeClass("disabled");
        } else {
            if (!$("#mint-nft").hasClass("disabled")) {
                $("#mint-nft").addClass("disabled");
            }
        }
        $("#mint_allowance").html(mintAllowance);
    }
}

async function mintButton() {
    let networkOk = await waitForSwitch(bscId, "mint");
    if (!networkOk) {
        return;
    }
    if (selectedAccount != null) {
        $("#confirm_mint").addClass("popup_open");
    }
}

async function mintNFT() {
    $("#confirm_mint").removeClass("popup_open");
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("MINTING");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        mintNFT();
    });

    let nftContract = new web3.eth.Contract(
        abiNFTChest,
        "0x60c1b9f4c8e271740f23986dc4c02ddf3daae2cf",
        null
    );

    try {
        let txReturn = await nftContract.methods.mint(selectedAccount).send({
            from: selectedAccount,
        });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            $('strong[id^="earn-fee"]').html("0.00");
            $("#mint_success").addClass("popup_open");
            $("#mint_allowance").html(
                parseFloat($("#mint_allowance").html()) - 1
            );
            getNFTMintingRights();
            return;
        } else {
            $("#error-popup").addClass("popup_open");
            return;
        }
    } catch (e) {
        $("#error-popup").addClass("popup_open");
        console.log(e);
    }
    $("#wait-popup").removeClass("popup_open");
}

/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {
    await web3Modal.clearCachedProvider();
    provider = null;
    // selectedAccount = null;
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkConnected() {
    if (typeof provider == "undefined" || provider == null) {
        await onConnect();
    }
}
/**
 * Main entry point.
 */
window.addEventListener("load", async () => {
    if (typeof Sentry != "undefined") {
        Sentry.init({
            dsn: "https://c1af45523e7e449ca5beac882d34def2@o517705.ingest.sentry.io/5625926",
            // integrations: [new Integrations.BrowserTracing()],
            // tracesSampleRate: 1.0,
        });
    }

    $(function () {
        $("#footer").load("footer.html");
    });

    uint256Max = new Big(
        "115792089237316195423570985008687907853269984665640564039457584007913129639935"
    )
        .toFixed(0)
        .toString();

    if (localStorage.getItem("SELECTED_CHAIN") != null) {
        if (localStorage.getItem("SELECTED_CHAIN") != "xDAI") {
            $('*[data-chain="xDAI"]').removeClass("selected");
            $(
                '*[data-chain="' + localStorage.getItem("SELECTED_CHAIN") + '"]'
            ).addClass("selected");
        }
        if (localStorage.getItem("SELECTED_CHAIN") != "Gnosis") {
            $('*[data-chain="Gnosis"]').removeClass("selected");
            $(
                '*[data-chain="' + localStorage.getItem("SELECTED_CHAIN") + '"]'
            ).addClass("selected");
        }
        if (localStorage.getItem("SELECTED_CHAIN") != "BSC") {
            $('*[data-chain="BSC"]').removeClass("selected");
            $(
                '*[data-chain="' + localStorage.getItem("SELECTED_CHAIN") + '"]'
            ).addClass("selected");
        }
        if (localStorage.getItem("SELECTED_CHAIN") != "ETH") {
            $('*[data-chain="ETH"]').removeClass("selected");
            $(
                '*[data-chain="' + localStorage.getItem("SELECTED_CHAIN") + '"]'
            ).addClass("selected");
        }
        selectChain(localStorage.getItem("SELECTED_CHAIN"), false);
    } else {
        selectChain("xDAI", false);
    }

    if (localStorage.getItem("SELECTED_CURRENCY") != null) {
        if (localStorage.getItem("SELECTED_CURRENCY") != "USD") {
            $('*[data-currency="USD"]').removeClass("selected");
            $('*[data-currency="NATIVE"]').addClass("selected");
        }
        selectCurrency(localStorage.getItem("SELECTED_CURRENCY"), false);
    } else {
        selectCurrency("xDAI", false);
    }

    if (window.location.href.indexOf("faq?switchToxDai") != -1) {
        $("#network-faq-click").click();
    }

    await init();
    if (
        window.location.href.indexOf("earn") == -1 &&
        window.location.href.indexOf("farm") == -1 &&
        window.location.href.indexOf("withdraw") == -1
    ) {
        $(".preloader").hide();
    }

    if (window.location.href.indexOf("nft") != -1) {
        getNFTMintingRights();
        $("#mint-nft").on("click", function () {
            if (!$("#mint-nft").hasClass("disabled")) {
                mintButton();
            }
        });
    }

    if ($("#tt").length) {
        $('[id^="tt"]').parent().next().hide();
        $('[id^="tt"]').change(function () {
            if (this.checked) {
                $(this).parent().next().show();
            } else {
                $(this).parent().next().hide();
            }
        });
    }

    if ($("#planttree").length) {
        $('[id^="planttree"]').change(function () {
            if (this.checked) {
                $('strong[id^="swap-total"]').html(
                    parseFloat(
                        parseFloat(
                            $('strong[id^="swap-total"]').html().slice(0, -5)
                        ) + 0.8
                    ).toFixed(2) + " xDAI"
                );
                $("#singleswap_first").html("1/<strong>2</strong>");
            } else {
                $('strong[id^="swap-total"]').html(
                    parseFloat(
                        parseFloat(
                            $('strong[id^="swap-total"]').html().slice(0, -5)
                        ) - 0.8
                    ).toFixed(2) + " xDAI"
                );
                $("#singleswap_first").html("1/<strong>1</strong>");
            }
        });
    }

    if ($("#gaseth").length) {
        $('[id^="gaseth"]').change(function () {
            if (this.checked) {
                paySelf = true;
                $('[id^="gaseth"]').prop("checked", true);
            } else {
                paySelf = false;
                $('[id^="gaseth"]').prop("checked", false);
            }
        });
    }

    $("#connect-wallet").hover(
        function () {
            if (typeof provider != "undefined" && provider != null) {
                $("#connect-wallet").text("DISCONNECT");
            }
        },
        function () {
            if (typeof provider != "undefined" && provider != null) {
                $("#connect-wallet").text("CONNECTED");
            }
        }
    );

    $("#connect-wallet").on("click", function () {
        if (typeof provider != "undefined" && provider != null) {
            onDisconnect();
            sleep(1000);
            $("#connect-wallet").text("CONNECT");
            localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
            web3Modal.clearCachedProvider();
            provider = null;
            if (selectedNetwork == "xDAI") {
                $("#currency-name-balance").html("xDAI");
            } else if (selectedNetwork == "ETH") {
                $("#currency-name-balance").html("ETH");
            } else if (selectedNetwork == "BSC") {
                $("#currency-name-balance").html("BNB");
            }
            if (nativeCurrency) {
                $("#balance-currency").html('<i id="balance">0.00</i>');
                $("#xgt-currency").html('<i id="xgt-balance">0.00</i>');
                $("#xgt-currency-shop").html(
                    '<b><span id="xgt-balance">0.00</span></b>'
                );
            } else {
                $("#balance-currency").html('$ <i id="balance">0.00</i>');
                $("#xgt-currency").html('$ <i id="xgt-balance">0.00</i>');
                $("#xgt-currency-shop").html(
                    '$ <b><span id="xgt-balance">0.00</span></b>'
                );
            }

            $("#balance").html("0.00");

            $("#earnings").html("0.00");
            $("#xgt-balance").html("0.00");
        } else {
            init(true);
            firstConnect = true;
            // onConnect()
        }
    });

    if (window.location.href.indexOf("earn") > -1) {
        document
            .querySelector("#earn-button")
            .addEventListener("click", startEarning);
        if (selectedNetwork == "xDAI" || selectedNetwork == "BSC") {
            if (!$("#soon_bsc_earn").hasClass("hidden")) {
                $("#soon_bsc_earn").addClass("hidden");
            }
            if (!$("#soon_eth_earn").hasClass("hidden")) {
                $("#soon_eth_earn").addClass("hidden");
            }
            if ($("#earn-wrapper-1").hasClass("comming-soon")) {
                $("#earn-wrapper-1").removeClass("comming-soon");
            }
            if ($("#earn-wrapper-2").hasClass("soon")) {
                $("#earn-wrapper-2").removeClass("soon");
            }
        } else {
            if (!$("#soon_bsc_earn").hasClass("hidden")) {
                $("#soon_bsc_earn").removeClass("hidden");
            }
            if ($("#soon_eth_earn").hasClass("hidden")) {
                $("#soon_eth_earn").addClass("hidden");
            }
            if (!$("#earn-wrapper-1").hasClass("comming-soon")) {
                $("#earn-wrapper-1").addClass("comming-soon");
            }
            if (!$("#earn-wrapper-2").hasClass("soon")) {
                $("#earn-wrapper-2").addClass("soon");
            }
        }

        $("#earn-input").on("input", async function () {
            if (parseFloat($("#earn-input").val()) < 0) {
                $("#earn-input").val("");
            }
            await waitForCompleteLoad();
            let xgtBalance = 0;
            if (selectedNetwork == "xDAI") {
                xgtBalance = gBalanceXGTXDai;
            } else if (selectedNetwork == "BSC") {
                xgtBalance = gBalanceXGTBSC;
            }
            if (parseFloat($("#earn-input").val()) > xgtBalance) {
                $("#earn-input").addClass("redInput");
            } else {
                $("#earn-input").removeClass("redInput");
            }
            if ($("#earn-projection-select").val() == "xgt") {
                $("#earn-projection").attr(
                    "placeholder",
                    parseFloat($("#earn-input").val() * (8.4029 / 100)).toFixed(
                        2
                    ) + " XGT"
                );
            } else {
                $("#earn-projection").attr(
                    "placeholder",
                    "$" +
                        parseFloat(
                            $("#earn-input").val() * (8.4029 / 100) * xgtPrice
                        ).toFixed(2)
                );
            }
            $("#earnTotal").html(
                " <i>$ </i>" +
                    parseFloat($("#earn-input").val() * xgtPrice).toFixed(2)
            );
        });
        $("#earn-projection-select").on("change", async function () {
            await waitForCompleteLoad();
            if ($("#earn-projection-select").val() == "xgt") {
                $("#earn-logo-right").html(xgtSymbol);
            } else {
                $("#earn-logo-right").html(usdSymbol);
            }
            $("#earn-input").trigger("input");
        });
    }

    if (window.location.href.indexOf("farm_pool") > -1) {
        switchView(true);
    }

    if (
        window.location.href.indexOf("farm") > -1 &&
        window.location.href.indexOf("farm_pool") == -1
    ) {
        $("#xgt").change(async function () {
            if (!$("#xgt").is(":checked")) {
                $("#provideLiquidityXGT").removeClass("redInput");
            }
            // $("#provideLiquidityXGT").prop("disabled", !$("#xgt").is(':checked'));
            await waitForCompleteLoad();
            $("#provideLiquidityXDai").trigger("input");
        });

        document
            .querySelector("#provideLiquidity")
            .addEventListener("click", provideLiquidity);
        $("#provideLiquidityXDai").on("input", async function () {
            if (parseFloat($("#provideLiquidityXDai").val()) < 0) {
                $("#provideLiquidityXDai").val("");
                $("#provideLiquidityXGT").val("");
                $("#provideLiquidityXDai").removeClass("redInput");
                $("#provideLiquidityXGT").removeClass("redInput");
                return;
            }
            if ($("#provideLiquidityXDai").val() == "") {
                $("#provideLiquidityXDai").val("");
                $("#provideLiquidityXGT").val("");
                $("#provideLiquidityXDai").removeClass("redInput");
                $("#provideLiquidityXGT").removeClass("redInput");
                return;
            }

            if (parseFloat($("#provideLiquidityXDai").val()) == 0) {
                $("#provideLiquidityXDai").removeClass("redInput");
                $("#provideLiquidityXGT").removeClass("redInput");
                $("#provideLiquidityXGT").val("");
                return;
            }

            await waitForCompleteLoad();
            // $("#provideLiquidityXDai").val(parseFloat($("#provideLiquidityXDai").val()).toFixed(2));
            let maxValueBase = gBalanceXDai;
            let maxValueXGT = gBalanceXGTXDai;
            let investAmount = parseFloat($("#provideLiquidityXDai").val());
            let lpRatio = lpRatioXDAI;
            let minAmount = 0.02;
            if (selectedNetwork == "ETH") {
                maxValueBase = gBalanceETH;
                maxValueXGT = gBalanceXGTETH;
                investAmount = investAmount * ethPrice;
                lpRatio = lpRatioETH;
                minAmount = 0.00002;
            } else if (selectedNetwork == "BSC") {
                maxValueBase = gBalanceBNB;
                maxValueXGT = gBalanceXGTBSC;
                investAmount = investAmount * bnbPrice;
                lpRatio = lpRatioBSC;
                minAmount = 0.0001;
            }

            if (parseFloat($("#provideLiquidityXDai").val()) < minAmount) {
                $("#provideLiquidityXDai").addClass("redInput");
                $("#provideLiquidityXGT").val("");
                return;
            }

            if (parseFloat($("#provideLiquidityXDai").val()) > maxValueBase) {
                // $("#provideLiquidityXDai").val(gBalanceXDai - 0.01);
                $("#provideLiquidityXDai").addClass("redInput");
            } else {
                $("#provideLiquidityXDai").removeClass("redInput");
            }

            if ($("#provideLiquidityXDai").val() > 0) {
                if ($("#xgt").is(":checked")) {
                    let xgtValue = new Big($("#provideLiquidityXDai").val())
                        .div(new Big(lpRatio))
                        .toString();
                    if (xgtValue > maxValueXGT) {
                        // xgtValue = gBalanceXGTXDai;
                        // $("#provideLiquidityXDai").val(new Big(xgtValue).mul(new Big(lpRatio)).toString())
                        $("#provideLiquidityXGT").addClass("redInput");
                    } else {
                        $("#provideLiquidityXGT").removeClass("redInput");
                    }
                    $("#provideLiquidityXGT").val(
                        parseFloat(xgtValue).toFixed(0)
                    );
                    investAmount = investAmount * 2;
                } else {
                    $("#provideLiquidityXGT").val("");
                }
                $("#liquidityTotal").html(
                    "<i>$ </i>" + parseFloat(investAmount).toFixed(2)
                );

                $("#rewards_month").val(
                    "$ " + (parseFloat(investAmount) * lpAPM).toFixed(2)
                );
                let poolShare = new Big(investAmount)
                    .mul(new Big(10 ** 18))
                    .div(new Big(lpReserve.toString()))
                    .mul(new Big(50))
                    .toFixed(0);
                if (new Big(poolShare).gt(new Big("100"))) {
                    poolShare = new Big("100");
                }
                if (new Big(poolShare).eq(0)) {
                    poolShare = "< 0.01";
                }
                $("#poolshare").html(poolShare.toString());
            } else {
                $("#rewards_month").val("$ 0.00");
                $("#provideLiquidityXGT").val("");
                $("#liquidityTotal").html("<i>$ </i> 0.00");
                $("#poolshare").html("0");
            }
            // $("#provideLiquidityXGT").trigger("input");
        });
        $("#provideLiquidityXGT").on("input", async function () {
            if (parseFloat($("#provideLiquidityXGT").val()) < 0) {
                $("#provideLiquidityXGT").val("");
                $("#provideLiquidityXDai").val("");
                $("#provideLiquidityXDai").removeClass("redInput");
                $("#provideLiquidityXGT").removeClass("redInput");
                return;
            }
            if ($("#provideLiquidityXGT").val() == "") {
                $("#provideLiquidityXDai").removeClass("redInput");
                $("#provideLiquidityXGT").removeClass("redInput");
                return;
            }

            await waitForCompleteLoad();
            // $("#provideLiquidityXGT").val(parseFloat($("#provideLiquidityXGT").val()).toFixed(2));
            if (parseFloat($("#provideLiquidityXGT").val()) > gBalanceXGTXDai) {
                // $("#provideLiquidityXGT").val(gBalanceXGTXDai);
                $("#provideLiquidityXGT").addClass("redInput");
            } else {
                $("#provideLiquidityXGT").removeClass("redInput");
            }
            if ($("#provideLiquidityXGT").val() > 0) {
                let xdaiValue = new Big($("#provideLiquidityXGT").val())
                    .mul(lpRatio)
                    .toString();
                if (xdaiValue > gBalanceXDai) {
                    // xdaiValue = gBalanceXDai;
                    // $("#provideLiquidityXGT").val(new Big(xdaiValue).div(lpRatio).toString())
                    $("#provideLiquidityXDai").addClass("redInput");
                } else {
                    $("#provideLiquidityXDai").removeClass("redInput");
                }
                $("#provideLiquidityXDai").val(
                    parseFloat(xdaiValue).toFixed(2)
                );

                $("#liquidityTotal").html(
                    "<i>$ </i>" +
                        parseFloat(parseFloat(totalValue) * 2).toFixed(0)
                );
                $("#rewards_month").val(
                    "$ " +
                        (
                            parseFloat($("#provideLiquidityXDai").val()) / 11.3
                        ).toFixed(2)
                );
            } else {
                $("#rewards_month").val("$ 0.00");
                $("#provideLiquidityXDai").val("");
            }
            // $("#provideLiquidityXDai").trigger("input");
        });
    }
    // SWAP ELEMENT IS THERE
    if ($("#swap-select-right").length) {
        document.querySelector("#swap").addEventListener("click", swap);

        $('[id^="slippage"]').on("input", function () {
            let newVal = $(this).val();
            if (parseFloat(newVal) < 0.05) {
                newVal = 0.05;
            }
            if (parseFloat(newVal) > 95) {
                newVal = 95;
            }
            $('[id^="slippage"]').val(newVal);
        });

        $("#claim-rewards").on("click", async function () {
            withdrawId = 3;
            withdraw_Final();
        });

        $("#swapLeft").on("input", async function () {
            if (parseFloat($("#swapLeft").val()) < 0) {
                $("#swapLeft").val("");
                $("#swapRight").val("");
                $("#swapLeft").removeClass("redInput");
                return;
            }
            await waitForCompleteLoad();
            // if ($("#swap-select-left").val() == "xgt" && parseFloat($("#swapLeft").val()) > gBalanceXGTXDai) {
            //     $("#swapLeft").val(gBalanceXGTXDai);
            // }
            // if ($("#swap-select-left").val() == "xdai" && parseFloat($("#swapLeft").val()) > gBalanceXDai) {
            //     $("#swapLeft").val(parseFloat(gBalanceXDai - 0.01).toFixed(2).toString());
            // }
            // if ($("#swap-select-left").val() == "dai" && parseFloat($("#swapLeft").val()) > gBalanceDAI) {
            //     $("#swapLeft").val(gBalanceDAI);
            // }
            if ($("#swapLeft").val() > 0) {
                await getRateFixedLeft();
            } else {
                $("#swapRight").val("");
                $("#swapLeft").removeClass("redInput");
            }
            if (
                $("#swap-select-left").val() == "xgt-to-mainnet" ||
                $("#swap-select-left").val() == "xgt-to-xdai" ||
                $("#swap-select-left").val() == "xgt-to-bsc"
            ) {
                $("#swap-logo-left").html(xgtSymbol);
                $("#swap-logo-right").html(xgtSymbol);
                $("#swapRight").prop("disabled", true);
                $("#swap-select-right").val("xgt");
                $("#swap-select-right").prop("disabled", true);
            } else {
                $("#swapRight").prop("disabled", false);
                $("#swap-select-right").prop("disabled", false);
            }

            if ($("#swap-select-left").val() == "xgt-to-mainnet") {
                $("#swapRight").attr("placeholder", "0 XGT to Mainnet");
                $("#swapLeft").attr("placeholder", "0 XGT from xDai");
            } else if ($("#swap-select-left").val() == "xgt-to-xdai") {
                $("#swapRight").attr("placeholder", "0 XGT to xDai");
                $("#swapLeft").attr("placeholder", "0 XGT from BSC");
            } else if ($("#swap-select-left").val() == "xgt-to-bsc") {
                $("#swapRight").attr("placeholder", "0 XGT to BSC");
                $("#swapLeft").attr("placeholder", "0 XGT from xDai");
            } else {
                if ($("#swap-select-right").val() == "xgt") {
                    $("#swapRight").attr("placeholder", "0 XGT");
                } else {
                    if (selectedNetwork == "BSC") {
                        $("#swapRight").attr("placeholder", "0.00 BNB");
                    } else if (selectedNetwork == "xDAI") {
                        $("#swapRight").attr("placeholder", "0.00 xDAI");
                    } else {
                        $("#swapRight").attr("placeholder", "0.00");
                    }
                }
            }

            if (
                $("#swap-select-left").val() == "xgt" ||
                $("#swap-select-left").val() == "xgt-to-mainnet" ||
                $("#swap-select-left").val() == "xgt-to-xdai" ||
                $("#swap-select-left").val() == "xgt-to-bsc"
            ) {
                if (!$("#swap-left-xgt-price").is(":visible")) {
                    $("#swap-left-xgt-price").show();
                }
                if (parseFloat($("#swapLeft").val()) > 0.1) {
                    $("#swap-left-xgt-price").html(
                        " <i>$ </i>" +
                            parseFloat(
                                parseFloat($("#swapLeft").val()) * xgtPrice
                            )
                                .toFixed(2)
                                .toString()
                    );
                } else {
                    $("#swap-left-xgt-price").html(" <i>$ </i>0.00");
                }
            } else {
                $("#swap-left-xgt-price").hide();
            }
        });
        $("#swapRight").on("input", async function () {
            if (parseFloat($("#swapRight").val()) < 0) {
                $("#swapLeft").val("");
                $("#swapRight").val("");
                $("#swapLeft").removeClass("redInput");
                return;
            }
            await waitForCompleteLoad();
            if ($("#swapRight").val() > 0) {
                await getRateFixedRight();
            } else {
                $("#swapLeft").val("");
                $("#swapLeft").removeClass("redInput");
            }

            if ($("#swap-select-left").val() == "xgt") {
                if (!$("#swap-left-xgt-price").is(":visible")) {
                    $("#swap-left-xgt-price").show();
                }
                if (parseFloat($("#swapLeft").val()) > 0.1) {
                    $("#swap-left-xgt-price").html(
                        " <i>$ </i>" +
                            parseFloat(
                                parseFloat($("#swapLeft").val()) * xgtPrice
                            )
                                .toFixed(2)
                                .toString()
                    );
                } else {
                    $("#swap-left-xgt-price").html(" <i>$ </i>0.00");
                }
            } else {
                $("#swap-left-xgt-price").hide();
            }
        });

        $("#swap-select-right").change(async function () {
            await waitForCompleteLoad();
            if (
                $("#swap-select-left").val().indexOf("xgt-to") == -1 &&
                !allowedPairs
                    .get(selectedNetwork)
                    [$("#swap-select-left").val()].includes(
                        $("#swap-select-right").val()
                    )
            ) {
                $(
                    "#swap-select-left option[value=" +
                        allowedSources.get(selectedNetwork)[
                            $("#swap-select-right").val()
                        ][0] +
                        "]"
                )
                    .prop("selected", true)
                    .trigger("change");
            }
            if ($("#swap-select-right").val() == "xgt") {
                $("#swapRight").attr("placeholder", "0 XGT");
            } else {
                if (selectedNetwork == "BSC") {
                    $("#swapRight").attr("placeholder", "0.00 BNB");
                } else if (selectedNetwork == "xDAI") {
                    $("#swapRight").attr("placeholder", "0.00 xDAI");
                } else {
                    $("#swapRight").attr("placeholder", "0.00");
                }
            }

            $("#swapLeft").trigger("input");
            if ($("#swap-select-right").val() == "xgt") {
                $("#swap-logo-right").html(xgtSymbol);
            } else if ($("#swap-select-right").val() == "xdai") {
                $("#swap-logo-right").html(xdaiSymbol);
            } else if ($("#swap-select-right").val() == "dai") {
                $("#swap-logo-right").html(daiSymbol);
            } else if ($("#swap-select-right").val() == "eth") {
                $("#swap-logo-right").html(ethSymbol);
            } else if ($("#swap-select-right").val() == "bnb") {
                $("#swap-logo-right").html(bnbSymbol);
            }
        });
        $("#swap-select-left").change(async function () {
            await waitForCompleteLoad();
            if (
                $("#swap-select-left").val() == "xgt-to-mainnet" ||
                $("#swap-select-left").val() == "xgt-to-xdai"
            ) {
                $("#swapLeft").val("");
                $("#swapRight").val("");
            }
            if (
                $("#swap-select-left").val().indexOf("xgt-to") == -1 &&
                !allowedPairs
                    .get(selectedNetwork)
                    [$("#swap-select-left").val()].includes(
                        $("#swap-select-right").val()
                    )
            ) {
                $(
                    "#swap-select-right option[value=" +
                        allowedPairs.get(selectedNetwork)[
                            $("#swap-select-left").val()
                        ][0] +
                        "]"
                )
                    .prop("selected", true)
                    .trigger("change");
            }
            if ($("#swap-select-left").val() == "usd") {
                $("#swap").html("BUY NOW");
                $("#swap").addClass("bluebuy");
            } else {
                $("#swap").html("SWAP NOW");
                $("#swap").removeClass("bluebuy");
            }
            if ($("#swap-select-left").val().indexOf("xgt") != -1) {
                $("#swapLeft").attr("placeholder", "0 XGT");
            } else {
                if ($("#swap-select-left").val() == "usd") {
                    $("#swapLeft").attr("placeholder", "$ 0.00");
                } else if ($("#swap-select-left").val() == "dai") {
                    $("#swapLeft").attr("placeholder", "0.00 DAI");
                } else {
                    if (selectedNetwork == "BSC") {
                        $("#swapLeft").attr("placeholder", "0.00 BNB");
                    } else if (selectedNetwork == "xDAI") {
                        $("#swapLeft").attr("placeholder", "0.00 xDAI");
                    } else {
                        $("#swapLeft").attr("placeholder", "0.00");
                    }
                }
            }
            $("#swapRight").trigger("input");
            $("#swapLeft").trigger("input");
            if ($("#swap-select-left").val() == "xgt") {
                $("#swap-logo-left").html(xgtSymbol);
            } else if ($("#swap-select-left").val() == "xdai") {
                $("#swap-logo-left").html(xdaiSymbol);
            } else if ($("#swap-select-left").val() == "dai") {
                $("#swap-logo-left").html(daiSymbol);
            } else if ($("#swap-select-left").val() == "usd") {
                $("#swap-logo-left").html(usdSymbol);
            } else if ($("#swap-select-left").val() == "bnb") {
                $("#swap-logo-left").html(bnbSymbol);
            } else if ($("#swap-select-left").val() == "eth") {
                $("#swap-logo-left").html(ethSymbol);
            }
        });
        $("#swap-select-right").trigger("change");
        $("#swap-select-left").trigger("change");
    }

    if (window.location.href.indexOf("withdraw") > -1) {
        $("#withdraw-select").change(async function () {
            await waitForCompleteLoad();
            if ($("#withdraw-select").val() == "interest") {
                withdrawId = 1;
                $("#withdraw-input").val("0.00");
            } else if ($("#withdraw-select").val() == "farming") {
                withdrawId = 2;
                $("#withdraw-input").val("0.00");
            } else if ($("#withdraw-select").val() == "xgt") {
                withdrawId = 3;
                $("#withdraw-input").val(
                    parseFloat(
                        parseFloat(
                            web3xDai.utils
                                .fromWei(unclaimedXGT.toString())
                                .toString()
                        ) * xgtPrice
                    ).toFixed(2)
                );
            } else if ($("#withdraw-select").val() == "all") {
                withdrawId = 4;
                $("#withdraw-input").val(
                    parseFloat(
                        parseFloat(lpValue) + parseFloat(stakeValue)
                    ).toFixed(2)
                );
            }
        });
        $("#withdraw-select").trigger("change");

        $("#withdraw-input").on("input", async function () {
            await waitForCompleteLoad();
            if (
                withdrawId == 1 &&
                parseFloat($("#withdraw-input").val()) >
                    parseFloat(stakeValue.toString())
            ) {
                $("#withdraw-input").val(parseFloat(stakeValue).toFixed(2));
            }
            if (
                withdrawId == 2 &&
                parseFloat($("#withdraw-input").val()) >
                    parseFloat(lpValue.toString())
            ) {
                $("#withdraw-input").val(parseFloat(lpValue).toFixed(2));
            }
            if (withdrawId == 3) {
                $("#withdraw-input").val(
                    parseFloat(
                        parseFloat(
                            web3xDai.utils
                                .fromWei(unclaimedXGT.toString())
                                .toString()
                        ) * xgtPrice
                    ).toFixed(2)
                );
            }
            if (withdrawId == 4) {
                $("#withdraw-input").val(
                    parseFloat(
                        parseFloat(lpValue) + parseFloat(stakeValue)
                    ).toFixed(2)
                );
            }
        });

        $("#withdrawMax").on("click", async function () {
            await waitForCompleteLoad();
            if (withdrawId == 1) {
                $("#withdraw-input").val(parseFloat(stakeValue).toFixed(2));
            } else if (withdrawId == 2) {
                $("#withdraw-input").val(parseFloat(lpValue).toFixed(2));
            }
        });
    }

    if ($("#wait-joke").length) {
        let jokes = [
            "How many miners does it take to change a light bulb?",
            "What kind of car will you never see a Bitcoiner driving?",
            "What is an assassin’s favorite cryptocurrency payment method?",
            "What do cryptocurrency investors do for fun?",
            "What’s the difference between Bitcoin and NASA?",
            "Why won’t the government embrace Bitcoin?",
            "Why do Bitcoin cryptologists drive recklessly?",
            "Where does an Eskimo keep his Bitcoins?",
            "What’s the difference between a bitcoin miner and an average plumber?",
            "Why do Bitcoiners want Lambo?",
        ];

        let randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        $("#wait-joke").html(randomJoke);
    }
});

async function XGTtoMainnet() {
    if ($("#swapLeft").val() == "" || $("#swapRight").val() == "") {
        return;
    }
    if ($("#swapLeft").hasClass("redInput")) {
        $("#error-popup-money-swap").addClass("popup_open");
        return;
    }
    let xgtContract = new web3.eth.Contract(abiXGT, addressXGT, null);
    let networkOk = await waitForSwitch(xdaiId, "swap");
    if (!networkOk) {
        return;
    }
    let xgtAmount = web3.utils.toWei($("#swapLeft").val(), "ether");
    try {
        await xgtContract.methods.transferToMainnet(xgtAmount).send({
            from: selectedAccount,
        });
    } catch (e) {
        console.log(e);
    }
}

async function showTorusLoader() {
    $(".preloader").show();
    while (
        typeof $("#torusIframe")[0] == "undefined" ||
        $("#torusIframe")[0].style.display != "block"
    ) {
        await sleep(100);
    }
    await sleep(500);
    $(".preloader").hide();
}

var validate = function (e) {
    var t = e.value;
    t = t.indexOf(",") >= 0 ? t.replace(/,/g, ".") : t;
    e.value =
        t.indexOf(".") >= 0
            ? t.substr(0, t.indexOf(".")) +
              t.substr(t.indexOf("."), networkAllowedDecimals)
            : t;
};

async function waitForCompleteLoad() {
    if (!VALUES_LOADED) {
        while (!VALUES_LOADED) {
            await sleep(100);
        }
        console.log("Loading done.");
        $(".preloader").hide();
    }
}

async function selectChain(input, alreadyLoaded) {
    if (input == "Gnosis") {
        input = "xDAI";
    }
    selectedNetwork = input;
    $(".network-name-text").each(function () {
        if (selectedNetwork == "XDAI") {
            $(this).html("Gnosis");
        } else if (selectedNetwork == "ETH") {
            $(this).html("ETH");
        } else if (selectedNetwork == "BSC") {
            $(this).html("BNB");
        }
    });
    if (selectedNetwork == "xDAI") {
        networkAllowedDecimals = 3;
        $("#farm-currency").html(xdaiSymbol);
        $("#provideLiquidityXDai").attr("placeholder", "0 XDAI");
        $("#network-value").html("1");
        $("#swap-select-left option[value='eth']").remove();
        $("#swap-select-left option[value='xdai']").remove();
        $("#swap-select-left option[value='dai']").remove();
        $("#swap-select-left option[value='usd']").remove();
        $("#swap-select-left option[value='bnb']").remove();
        $("#swap-select-left option[value='xgt']").remove();
        $("#swap-select-left").prepend(new Option("XGT", "xgt"));
        // $("#swap-select-left").prepend(new Option("DAI", "dai"));
        $("#swap-select-left").prepend(new Option("xDAI", "xdai"));
        $("#swap-select-left").prepend(new Option("USD", "usd"));

        $("#swap-select-right option[value='xdai']").remove();
        $("#swap-select-right option[value='dai']").remove();
        $("#swap-select-right option[value='bnb']").remove();
        $("#swap-select-right option[value='eth']").remove();
        $("#swap-select-right option[value='xgt']").remove();
        // $("#swap-select-right").prepend(new Option("DAI", "dai"));
        $("#swap-select-right").prepend(new Option("XGT", "xgt"));
        $("#swap-select-right").prepend(new Option("xDAI", "xdai"));
        $('#swap-select-left option[value="usd"]')
            .prop("selected", true)
            .trigger("change");
        $('#swap-select-right option[value="xdai"]')
            .prop("selected", true)
            .trigger("change");
    } else if (selectedNetwork == "ETH") {
        networkAllowedDecimals = 6;
        $("#farm-currency").html(ethSymbol);
        $("#provideLiquidityXDai").attr("placeholder", "0 ETH");
        while (bnbPrice <= 0) {
            await sleep(30);
        }
        $("#network-value").html(parseFloat(ethPrice).toFixed(0));

        $("#swap-select-left option[value='eth']").remove();
        $("#swap-select-left option[value='xdai']").remove();
        $("#swap-select-left option[value='dai']").remove();
        $("#swap-select-left option[value='usd']").remove();
        $("#swap-select-left option[value='bnb']").remove();
        $("#swap-select-left option[value='xgt']").remove();
        $("#swap-select-left").prepend(new Option("XGT", "xgt"));
        // $("#swap-select-left").prepend(new Option("DAI", "dai"));
        $("#swap-select-left").prepend(new Option("ETH", "eth"));
        $("#swap-select-left").prepend(new Option("USD", "usd"));

        $("#swap-select-right option[value='xdai']").remove();
        $("#swap-select-right option[value='dai']").remove();
        $("#swap-select-right option[value='bnb']").remove();
        $("#swap-select-right option[value='eth']").remove();
        $("#swap-select-right option[value='xgt']").remove();
        // $("#swap-select-right").prepend(new Option("DAI", "dai"));
        $("#swap-select-right").prepend(new Option("XGT", "xgt"));
        $("#swap-select-right").prepend(new Option("ETH", "eth"));

        $('#swap-select-left option[value="usd"]')
            .prop("selected", true)
            .trigger("change");
        if (window.location.href.indexOf("earn") > -1) {
            $('#swap-select-right option[value="dai"]')
                .prop("selected", true)
                .trigger("change");
        } else {
            $('#swap-select-right option[value="eth"]')
                .prop("selected", true)
                .trigger("change");
        }
    } else {
        networkAllowedDecimals = 5;
        $("#farm-currency").html(bnbSymbol);
        $("#provideLiquidityXDai").attr("placeholder", "0 BNB");
        $("#network-value").html(parseFloat(bnbPrice).toFixed(0));
        $("#swap-select-left option[value='eth']").remove();
        $("#swap-select-left option[value='xdai']").remove();
        $("#swap-select-left option[value='dai']").remove();
        $("#swap-select-left option[value='usd']").remove();
        $("#swap-select-left option[value='bnb']").remove();
        $("#swap-select-left option[value='xgt']").remove();
        $("#swap-select-left").prepend(new Option("XGT", "xgt"));
        $("#swap-select-left").prepend(new Option("BNB", "bnb"));

        $("#swap-select-right option[value='xdai']").remove();
        $("#swap-select-right option[value='dai']").remove();
        $("#swap-select-right option[value='bnb']").remove();
        $("#swap-select-right option[value='eth']").remove();
        $("#swap-select-right option[value='xgt']").remove();
        $("#swap-select-right").prepend(new Option("XGT", "xgt"));
        $("#swap-select-right").prepend(new Option("BNB", "bnb"));
        $('#swap-select-left option[value="bnb"]')
            .prop("selected", true)
            .trigger("change");
    }
    if (window.location.href.indexOf("earn") > -1) {
        if (selectedNetwork == "xDAI" || selectedNetwork == "BSC") {
            if (!$("#soon_bsc_earn").hasClass("hidden")) {
                $("#soon_bsc_earn").addClass("hidden");
            }
            if (!$("#soon_eth_earn").hasClass("hidden")) {
                $("#soon_eth_earn").addClass("hidden");
            }
            if ($("#earn-wrapper-1").hasClass("comming-soon")) {
                $("#earn-wrapper-1").removeClass("comming-soon");
            }
            if ($("#earn-wrapper-2").hasClass("soon")) {
                $("#earn-wrapper-2").removeClass("soon");
            }
        } else {
            if (!$("#soon_bsc_earn").hasClass("hidden")) {
                $("#soon_bsc_earn").removeClass("hidden");
            }
            if ($("#soon_eth_earn").hasClass("hidden")) {
                $("#soon_eth_earn").addClass("hidden");
            }
            if (!$("#earn-wrapper-1").hasClass("comming-soon")) {
                $("#earn-wrapper-1").addClass("comming-soon");
            }
            if (!$("#earn-wrapper-2").hasClass("soon")) {
                $("#earn-wrapper-2").addClass("soon");
            }
        }
    }
    if (alreadyLoaded) {
        refreshBalance();
    }
}

function selectCurrency(input, alreadyLoaded) {
    if (input == "NATIVE") {
        nativeCurrency = true;
    } else {
        nativeCurrency = false;
    }
    if (alreadyLoaded) {
        refreshBalance();
    }
}

async function hideTorus() {
    if (web3Modal.providerController.cachedProvider == "torus") {
        let runForFifty = 200;
        while (runForFifty > 0) {
            if ($("#torusIframe").length) {
                $("#torusIframe").hide();
            }
            await sleep(50);
            runForFifty--;
        }
    }
}

async function updateCashbackLevel(level, progress) {
    if (window.location.href.indexOf("shop") > -1) {
        // translate progress to image
        let progressLevel = "0";
        if (progress > 0 && progress <= 15) {
            progressLevel = "10";
        } else if (progress > 15 && progress <= 30) {
            progressLevel = "20";
        } else if (progress > 30 && progress <= 45) {
            progressLevel = "30";
        } else if (progress > 45 && progress <= 65) {
            progressLevel = "40";
        } else if (progress > 65 && progress <= 80) {
            progressLevel = "50";
        } else if (progress > 80) {
            progressLevel = "60";
        }
        switch (level) {
            case 0:
                $("#round-progress-level-1").attr(
                    "src",
                    "images/round-progress_level_1.svg"
                );
                $("#round-progress-level-2").attr(
                    "src",
                    "images/round-progress_level_2.svg"
                );
                $("#round-progress-level-3").attr(
                    "src",
                    "images/round-progress_level_3.svg"
                );
                $("#round-progress-level-4").attr(
                    "src",
                    "images/round-progress_level_4.svg"
                );
                $("#round-progress-level-5").attr(
                    "src",
                    "images/round-progress_level_5.svg"
                );

                $("#box-status-level-1").attr("src", "images/box_closed.svg");
                $("#box-status-level-2").attr("src", "images/box_closed.svg");
                $("#box-status-level-3").attr("src", "images/box_closed.svg");
                $("#box-status-level-4").attr("src", "images/box_closed.svg");
                $("#box-status-level-5").attr("src", "images/box_closed.svg");

                $("#individual-status-level-1").attr(
                    "src",
                    "images/round-progress_" + progressLevel + ".svg"
                );
                $("#individual-status-level-2").attr(
                    "src",
                    "images/round-progress_0.svg"
                );
                $("#individual-status-level-3").attr(
                    "src",
                    "images/round-progress_0.svg"
                );
                $("#individual-status-level-4").attr(
                    "src",
                    "images/round-progress_0.svg"
                );
                $("#individual-status-level-5").attr(
                    "src",
                    "images/round-progress_0.svg"
                );

                $("#background-status-level").attr(
                    "src",
                    "images/progress_none.svg"
                );
                break;
            case 1:
                $("#round-progress-level-1").attr(
                    "src",
                    "images/round-progress_level_1_active.svg"
                );
                $("#round-progress-level-2").attr(
                    "src",
                    "images/round-progress_level_2.svg"
                );
                $("#round-progress-level-3").attr(
                    "src",
                    "images/round-progress_level_3.svg"
                );
                $("#round-progress-level-4").attr(
                    "src",
                    "images/round-progress_level_4.svg"
                );
                $("#round-progress-level-5").attr(
                    "src",
                    "images/round-progress_level_5.svg"
                );

                $("#box-status-level-1").attr("src", "images/box_opened.svg");
                $("#box-status-level-2").attr("src", "images/box_closed.svg");
                $("#box-status-level-3").attr("src", "images/box_closed.svg");
                $("#box-status-level-4").attr("src", "images/box_closed.svg");
                $("#box-status-level-5").attr("src", "images/box_closed.svg");

                $("#individual-status-level-1").attr(
                    "src",
                    "images/round-progress_100.svg"
                );
                $("#individual-status-level-2").attr(
                    "src",
                    "images/round-progress_" + progressLevel + ".svg"
                );
                $("#individual-status-level-3").attr(
                    "src",
                    "images/round-progress_0.svg"
                );
                $("#individual-status-level-4").attr(
                    "src",
                    "images/round-progress_0.svg"
                );
                $("#individual-status-level-5").attr(
                    "src",
                    "images/round-progress_0.svg"
                );

                $("#background-status-level").attr(
                    "src",
                    "images/progress_one.svg"
                );
                break;
            case 2:
                $("#round-progress-level-1").attr(
                    "src",
                    "images/round-progress_level_1_active.svg"
                );
                $("#round-progress-level-2").attr(
                    "src",
                    "images/round-progress_level_2_active.svg"
                );
                $("#round-progress-level-3").attr(
                    "src",
                    "images/round-progress_level_3.svg"
                );
                $("#round-progress-level-4").attr(
                    "src",
                    "images/round-progress_level_4.svg"
                );
                $("#round-progress-level-5").attr(
                    "src",
                    "images/round-progress_level_5.svg"
                );

                $("#box-status-level-1").attr("src", "images/box_opened.svg");
                $("#box-status-level-2").attr("src", "images/box_opened.svg");
                $("#box-status-level-3").attr("src", "images/box_closed.svg");
                $("#box-status-level-4").attr("src", "images/box_closed.svg");
                $("#box-status-level-5").attr("src", "images/box_closed.svg");

                $("#background-status-level").attr(
                    "src",
                    "images/progress_two.svg"
                );

                $("#individual-status-level-1").attr(
                    "src",
                    "images/round-progress_100.svg"
                );
                $("#individual-status-level-2").attr(
                    "src",
                    "images/round-progress_100.svg"
                );
                $("#individual-status-level-3").attr(
                    "src",
                    "images/round-progress_" + progressLevel + ".svg"
                );
                $("#individual-status-level-4").attr(
                    "src",
                    "images/round-progress_0.svg"
                );
                $("#individual-status-level-5").attr(
                    "src",
                    "images/round-progress_0.svg"
                );
                break;
            case 3:
                $("#round-progress-level-1").attr(
                    "src",
                    "images/round-progress_level_1_active.svg"
                );
                $("#round-progress-level-2").attr(
                    "src",
                    "images/round-progress_level_2_active.svg"
                );
                $("#round-progress-level-3").attr(
                    "src",
                    "images/round-progress_level_3_active.svg"
                );
                $("#round-progress-level-4").attr(
                    "src",
                    "images/round-progress_level_4.svg"
                );
                $("#round-progress-level-5").attr(
                    "src",
                    "images/round-progress_level_5.svg"
                );

                $("#box-status-level-1").attr("src", "images/box_opened.svg");
                $("#box-status-level-2").attr("src", "images/box_opened.svg");
                $("#box-status-level-3").attr("src", "images/box_opened.svg");
                $("#box-status-level-4").attr("src", "images/box_closed.svg");
                $("#box-status-level-5").attr("src", "images/box_closed.svg");

                $("#background-status-level").attr(
                    "src",
                    "images/progress_three.svg"
                );

                $("#individual-status-level-1").attr(
                    "src",
                    "images/round-progress_100.svg"
                );
                $("#individual-status-level-2").attr(
                    "src",
                    "images/round-progress_100.svg"
                );
                $("#individual-status-level-3").attr(
                    "src",
                    "images/round-progress_100.svg"
                );
                $("#individual-status-level-4").attr(
                    "src",
                    "images/round-progress_" + progressLevel + ".svg"
                );
                $("#individual-status-level-5").attr(
                    "src",
                    "images/round-progress_0.svg"
                );
                break;
            case 4:
                $("#round-progress-level-1").attr(
                    "src",
                    "images/round-progress_level_1_active.svg"
                );
                $("#round-progress-level-2").attr(
                    "src",
                    "images/round-progress_level_2_active.svg"
                );
                $("#round-progress-level-3").attr(
                    "src",
                    "images/round-progress_level_3_active.svg"
                );
                $("#round-progress-level-4").attr(
                    "src",
                    "images/round-progress_level_4_active.svg"
                );
                $("#round-progress-level-5").attr(
                    "src",
                    "images/round-progress_level_5.svg"
                );

                $("#box-status-level-1").attr("src", "images/box_opened.svg");
                $("#box-status-level-2").attr("src", "images/box_opened.svg");
                $("#box-status-level-3").attr("src", "images/box_opened.svg");
                $("#box-status-level-4").attr("src", "images/box_opened.svg");
                $("#box-status-level-5").attr("src", "images/box_closed.svg");

                $("#background-status-level").attr(
                    "src",
                    "images/progress_four.svg"
                );

                $("#individual-status-level-1").attr(
                    "src",
                    "images/round-progress_100.svg"
                );
                $("#individual-status-level-2").attr(
                    "src",
                    "images/round-progress_100.svg"
                );
                $("#individual-status-level-3").attr(
                    "src",
                    "images/round-progress_100.svg"
                );
                $("#individual-status-level-4").attr(
                    "src",
                    "images/round-progress_100.svg"
                );
                $("#individual-status-level-5").attr(
                    "src",
                    "images/round-progress_" + progressLevel + ".svg"
                );
                break;
            case 5:
                $("#round-progress-level-1").attr(
                    "src",
                    "images/round-progress_level_1_active.svg"
                );
                $("#round-progress-level-2").attr(
                    "src",
                    "images/round-progress_level_2_active.svg"
                );
                $("#round-progress-level-3").attr(
                    "src",
                    "images/round-progress_level_3_active.svg"
                );
                $("#round-progress-level-4").attr(
                    "src",
                    "images/round-progress_level_4_active.svg"
                );
                $("#round-progress-level-5").attr(
                    "src",
                    "images/round-progress_level_5_active.svg"
                );

                $("#box-status-level-1").attr("src", "images/box_opened.svg");
                $("#box-status-level-2").attr("src", "images/box_opened.svg");
                $("#box-status-level-3").attr("src", "images/box_opened.svg");
                $("#box-status-level-4").attr("src", "images/box_opened.svg");
                $("#box-status-level-5").attr("src", "images/box_opened.svg");

                $("#background-status-level").attr(
                    "src",
                    "images/progress_five.svg"
                );

                $("#individual-status-level-1").attr(
                    "src",
                    "images/round-progress_100.svg"
                );
                $("#individual-status-level-2").attr(
                    "src",
                    "images/round-progress_100.svg"
                );
                $("#individual-status-level-3").attr(
                    "src",
                    "images/round-progress_100.svg"
                );
                $("#individual-status-level-4").attr(
                    "src",
                    "images/round-progress_100.svg"
                );
                $("#individual-status-level-5").attr(
                    "src",
                    "images/round-progress_100.svg"
                );
                break;
        }
        startRewardPoller();
    }
}

async function checkStakedOverall(address) {
    while (typeof latestInfo == "undefined") {
        await sleep(30);
    }

    console.log("CHECKING ALL STAKING POOLS");

    let stakeContract = new web3xDai.eth.Contract(
        abiStaking,
        addressXGTStakeXDai,
        null
    );
    let xgtEarned = await stakeContract.methods
        .getCurrentUserBalance(address)
        .call();

    let rawXGT = parseFloat(
        new Big(xgtEarned.toString())
            .div(new Big(10 ** 18))
            .toFixed(2)
            .toString()
    );
    console.log("---------");
    console.log("Regular XGT Staking on xDAI: " + rawXGT + " XGT");
    console.log(
        "Regular XGT Staking on xDAI: $" +
            parseFloat(rawXGT * latestInfo.xgt_price_xdai).toFixed(2)
    );
    console.log("---------");

    let stakeContractBSC = new web3bsc.eth.Contract(
        abiStaking,
        addressXGTStakeBSC,
        null
    );
    let xgtEarnedBSCPool = await stakeContractBSC.methods
        .getCurrentUserBalance(address)
        .call();

    let rawXGTBSC = parseFloat(
        new Big(xgtEarnedBSCPool.toString())
            .div(new Big(10 ** 18))
            .toFixed(2)
            .toString()
    );

    console.log("Regular XGT Staking on BSC: " + rawXGTBSC + " XGT");
    console.log(
        "Regular XGT Staking on BSC: $" +
            parseFloat(rawXGTBSC * latestInfo.xgt_price_bsc).toFixed(2)
    );
    console.log("---------");

    let stakingContractLPxDAI = new web3xDai.eth.Contract(
        abiStakingv2,
        "0x37C96fAb4b83dd6BFE222D329785Dd574b88dc9c",
        null
    );

    let userInfoxDAI = await stakingContractLPxDAI.methods
        .userInfo(address)
        .call();

    let rawLPxDAI = parseFloat(
        new Big(userInfoxDAI.stake.toString())
            .div(new Big(10 ** 18))
            .toFixed(2)
            .toString()
    );

    console.log("LP Staking on xDai: " + rawLPxDAI + " LPs");
    console.log(
        "LP Staking on xDai: $" +
            parseFloat(
                (rawLPxDAI * latestInfo.total_pool_value[0]) /
                    latestInfo.total_pool_tokens[0]
            ).toFixed(2)
    );
    console.log("---------");

    let stakingContractLPBSC = new web3bsc.eth.Contract(
        abiStakingv2,
        "0x5ff6f49ad762962cea868866a65d4a14acb11563",
        null
    );

    let userInfoBSC = await stakingContractLPBSC.methods
        .userInfo(address)
        .call();

    let rawLPBSC = parseFloat(
        new Big(userInfoBSC.stake.toString())
            .div(new Big(10 ** 18))
            .toFixed(2)
            .toString()
    );

    console.log("LP Staking on BSC: " + rawLPBSC + " LPs");
    console.log(
        "LP Staking on BSC: $" +
            parseFloat(
                (rawLPBSC * latestInfo.total_pool_value[1]) /
                    latestInfo.total_pool_tokens[1]
            ).toFixed(2)
    );
    console.log("---------");
}
