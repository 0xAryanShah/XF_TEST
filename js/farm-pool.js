function generateFarmBlock(
    key,
    name,
    idoPool,
    value,
    stakeToken,
    shortStakeToken,
    stakeTokenImage,
    doubleIcon,
    rewardTokens,
    yieldType,
    totalFarm,
    term,
    totalFarmToken,
    youFarm,
    fee,
    yourReward,
    balance
) {
    const farmBlock = `
        <div class="farm-item collapse pool-hidden" id="farm_item_${key}">
            <div class="farm-item-marker">FARM NOW</div>
            <div class="farm-item-content">
                <div class="expanded-content first">
                    <div class="expanded-content-first">
                        <div class="farm-item-content-left">
                            <div class="farm-item-content-left-name" id="farm_content_name_${key}">${name}</div>
                            <div class="farm-item-content-left-value" id="farm_content_value_${key}">${value}</div>
                        </div>
                        <div class="farm-item-content-center">
                            <div class="farm-item-content-center-item">
                                <div class="farm-item-content-center-icon">
                                    <img src="./images/farm/${stakeTokenImage}.svg" ${(() => {
        if (doubleIcon == true) {
            return `width="75" height="75"`;
        } else {
            return `width="50" height="50"`;
        }
    })()}
                                        alt="${stakeToken}">
                                </div>
                                <div class="farm-item-content-center-currency">${stakeToken}</div>
                            </div>
                            <div class="farm-item-content-center-center">
                                <img src="./images/farm/big.svg" width="30" height="30" alt="Big">
                            </div>
                        </div>
                    </div>
                    <div class="mobile-collapse">
                        <div class="farm-item-content-center">
                            <div class="farm-item-content-center-item">
                                <div class="farm-item-content-center-icon">
                                    <img src="./images/farm/${stakeTokenImage}.svg" ${(() => {
        if (doubleIcon == true) {
            return `width="75" height="75"`;
        } else {
            return `width="50" height="50"`;
        }
    })()}
                                        alt="${stakeToken}">
                                </div>
                                <div class="farm-item-content-center-currency">${stakeToken}</div>
                            </div>
                            <div class="farm-item-content-center-center">
                                <img src="./images/farm/big.svg" width="30" height="30" alt="Big">
                            </div>
                        </div>
                        <div class="farm-item-content-center-item">
                            <div class="farm-item-content-center-icon">
                            ${(() => {
                                if (rewardTokens.length == 2) {
                                    return `<img
                                            class="first-icon"
                                            src="./images/farm/${rewardTokens[0].toLowerCase()}.svg"
                                            width="45"
                                            height="45"
                                            alt="${rewardTokens[0]}"
                                        />
                                        <img
                                            class="second-icon"
                                            src="./images/farm/${rewardTokens[1].toLowerCase()}.svg"
                                            width="45"
                                            height="45"
                                            alt="${rewardTokens[1]}"
                                        />`;
                                } else {
                                    return `<img
                                        src="./images/farm/${rewardTokens[0].toLowerCase()}.svg"
                                        width="45"
                                        height="45"
                                        alt="${rewardTokens[0]}"
                                    />`;
                                }
                            })()}
                            </div>
                            ${(() => {
                                if (rewardTokens.length == 2) {
                                    return `<div
                                        class="farm-item-content-center-currency"
                                    >
                                        ${rewardTokens[0]} + ${rewardTokens[1]}
                                    </div>`;
                                } else {
                                    return `<div
                                        class="farm-item-content-center-currency"
                                    >
                                        ${rewardTokens[0]}
                                    </div>`;
                                }
                            })()}
                            
                        </div>
                    </div>
                    <div>
                        <div class="collapse-second">
                            <div class="farm-item-content-center-item">
                                <div class="farm-item-content-center-icon">
                                ${(() => {
                                    if (rewardTokens.length == 2) {
                                        return `<img
                                                class="first-icon"
                                                src="./images/farm/${rewardTokens[0].toLowerCase()}.svg"
                                                width="45"
                                                height="45"
                                                alt="${rewardTokens[0]}"
                                            />
                                            <img
                                                class="second-icon"
                                                src="./images/farm/${rewardTokens[1].toLowerCase()}.svg"
                                                width="45"
                                                height="45"
                                                alt="${rewardTokens[1]}"
                                            />`;
                                    } else {
                                        return `<img
                                            src="./images/farm/${rewardTokens[0].toLowerCase()}.svg"
                                            width="45"
                                            height="45"
                                            alt="${rewardTokens[0]}"
                                        />`;
                                    }
                                })()}
                                </div>
                                ${(() => {
                                    if (rewardTokens.length == 2) {
                                        return `<div
                                            class="farm-item-content-center-currency"
                                        >
                                            ${rewardTokens[0]} + ${rewardTokens[1]}
                                        </div>`;
                                    } else {
                                        return `<div
                                            class="farm-item-content-center-currency"
                                        >
                                            ${rewardTokens[0]}
                                        </div>`;
                                    }
                                })()}
                            </div>
                            <div class="farm-item-content-right">
                                <div class="farm-item-content-right-name">${yieldType.toUpperCase()} YIELD: <span id="yield_${key}">...</span>%</div>
                                <div class="farm-item-content-right-value">TVL (USD):
                                    <b>$<span id="total_farm_${key}">${totalFarm}</span></b>
                                </div>
                            </div>
                        </div>
                        <div class="info-container">
                            <div class="info-container-item">
                                <p class="info-container-title">${(() => {
                                    if (idoPool) {
                                        return `IDO-LOCK`;
                                    } else {
                                        return `ENDS IN`;
                                    }
                                })()}</p>
                                <p class="info-container-content"><b id="term_${key}">${term}</b></p>
                            </div>
                            <div class="info-container-item">
                                <p class="info-container-title">${yieldType.toUpperCase()} APY</p>
                                <p class="info-container-content"><b id="apy_${key}">...</b> %</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="expanded-content second">
                    <div class="farm-pool-btn-container">
                        <button class="farm-pool-btn" onclick="harvest_start(${key})">Harvest</button>
                        ${(() => {
                            if (idoPool) {
                                return `<button id="lock-button-${key}" class="farm-pool-btn lock-disabled" onclick="start_lock(${key})">Lock</button>`;
                            } else {
                                return ``;
                            }
                        })()}
                    </div>
                    <div class="detailed-info">
                        <div>
                            <p>TVL (${shortStakeToken}): </p>
                            <p><b><span id="total_farm_token_${key}">${totalFarmToken}</span> ${shortStakeToken}</b></p>
                        </div>
                        <div>
                            <p>YOUR ${shortStakeToken} FARMED: </p>
                            <p><b><span id="you_farm_${key}">${youFarm}</span> ${shortStakeToken}</b></p>
                        </div>
                        <div>
                            <p>UNSTAKE FEE: </p>
                            <p><b><span id="fee_${key}">${fee}</span> %</b></p>
                        </div>
                        <div>
                            <p>YOUR REWARDS: </p>
                            <p><b><span id="your_reward_${key}">${yourReward}</span> XGT</b></p>
                        </div>
                        <div id="lock_status_${key}" class="lock-note" style="display:none;">
                            <p><b>IDO registration closes in <span id="lock_duration_${key}">15M</span></b></p>
                        </div>
                    </div>
                </div>
                <div class="expanded-content third">
                    <div class="farm-switch small">
                        <div class="farm-switch-btn active small" id="switch_farm_${key}">FARM</div>
                        <div class="farm-switch-btn small" id="switch_unfarm_${key}">UNFARM</div>
                    </div>
                    <div class="farm-steps">
                        <div class="farm-step-control" onclick="setTokenInput(25,${key})">
                            25%
                        </div>
                        <div class="farm-step-control" onclick="setTokenInput(50,${key})">
                            50%
                        </div>
                        <div class="farm-step-control" onclick="setTokenInput(75,${key})">
                            75%
                        </div>
                        <div class="farm-step-control" onclick="setTokenInput(100,${key})">
                            MAX
                        </div>
                    </div>
                </div>
                <div class="expanded-content fourth">
                    <div class="farm-pool-btn-container">
                        <button class="farm-pool-btn" onclick="startStaking(${key});return false;">CONFIRM</button>
                    </div>
                    <div>
                        <div id="balance_input_${key}" class="detailed-info">
                            <div>
                                <input class="invisible_input" id="detail_usd_${key}" value=0>
                                <p><b>USD</b></p>
                            </div>
                            <div>
                            <input class="invisible_input" id="detail_stakeToken_${key}" value=0>
                                <p><b>${shortStakeToken}</b></p>
                            </div>
                        </div>
                        <p class="farm-pool-balance">YOUR BALANCE: <b><span id="balance_${key}">${balance}</span> ${shortStakeToken}</b></p>
                    </div>
                </div>
            </div>
            <div class="farm-item-detail desktop">
                DETAILS
                <img src="./images/expand.svg" alt="Expand">
            </div>
            <div class="farm-item-detail mobile prev">
                <img src="./images/expand.svg" alt="Expand">
                BACK
            </div>
            <div class="farm-item-detail mobile next">
                NEXT
                <img src="./images/expand.svg" alt="Expand">
            </div>
        </div>					
    `;
    $("#farm_items").append(farmBlock);
}

let totalFarmingValues = [];
let totalMonthlyReturnValues = [];

let stakeTokenBalancesReadable = [];
let stakeTokenBalancesWei = [];

let stakedStakeTokenBalancesReadable = [];
let stakedStakeTokenBalancesWei = [];

let rewardPollerRunning = false;

const historicData = [];
const farmData = [
    {
        key: 0,
        name: "XGT IDO/INO",
        idoPool: true,
        live: true,
        value: "ERC20",
        stakeToken: "XGT",
        shortStakeToken: "XGT",
        stakeTokenImage: "xgt",
        stakeTokenAddress: "0xC25AF3123d2420054c8fcd144c21113aa2853F39",
        doubleIcon: false,
        rewardTokens: ["XGT"],
        rewardTokensAddress: ["0xC25AF3123d2420054c8fcd144c21113aa2853F39"],
        yield: 40,
        yieldType: "fixed",
        totalFarm: 0.0,
        term: "5 DAYS",
        totalFarmToken: 0,
        youFarm: 0,
        fee: 0,
        yourReward: 0,
        balance: 0.0,
        usdValueStakeToken: 0.075,
        usdValueRewardTokens: [0.075],
        network: "xDAI",
        stakingPoolAddress: "0x27A9aaa920398A381e16D793B56624BCCfD72136",
    },
    {
        key: 1,
        name: "xDAI IDO/INO",
        idoPool: true,
        live: true,
        value: "ERC20",
        stakeToken: "XGT/xDAI-LP",
        shortStakeToken: "LP",
        stakeTokenImage: "xdai-lp",
        stakeTokenAddress: "0x27f363a0eA6EF8b406aEA8c0CC09C9C8F69bb25c",
        doubleIcon: true,
        rewardTokens: ["XGT"],
        rewardTokensAddress: ["0xC25AF3123d2420054c8fcd144c21113aa2853F39"],
        yield: 40,
        yieldType: "fixed",
        totalFarm: 0.0,
        term: "5 DAYS",
        totalFarmToken: 0,
        youFarm: 0,
        fee: 0,
        yourReward: 0,
        balance: 0.0,
        usdValueStakeToken: 0.075,
        usdValueRewardTokens: [0.075],
        network: "xDAI",
        stakingPoolAddress: "0xD5ee3b49617fD389758F5Bb145DE67860e31d6Af",
    },
    {
        key: 2,
        name: "XGT/xDAI LP",
        idoPool: false,
        live: false,
        value: "ERC20",
        stakeToken: "XGT/xDAI-LP",
        shortStakeToken: "LP",
        stakeTokenImage: "xdai-lp",
        stakeTokenAddress: "0x27f363a0eA6EF8b406aEA8c0CC09C9C8F69bb25c",
        doubleIcon: true,
        rewardTokens: ["XGT"],
        rewardTokensAddress: ["0xC25AF3123d2420054c8fcd144c21113aa2853F39"],
        yield: 0,
        yieldType: "fixed",
        totalFarm: 0.0,
        term: "",
        totalFarmToken: 0,
        youFarm: 0,
        fee: 0.1,
        yourReward: 0,
        balance: 0.0,
        network: "xDAI",
        usdValueStakeToken: 0.8857217622,
        usdValueRewardTokens: [0.19161582617754086],
        stakingPoolAddress: "0x37C96fAb4b83dd6BFE222D329785Dd574b88dc9c",
    },
    {
        key: 3,
        name: "XGT/BNB LP",
        idoPool: false,
        live: false,
        value: "BEP20",
        stakeToken: "XGT/BNB-LP",
        shortStakeToken: "LP",
        stakeTokenImage: "bnb-lp",
        stakeTokenAddress: "0x4de0ed25fed42de0d22fa9181aed7f4e42b583e9",
        doubleIcon: true,
        rewardTokens: ["XGT"],
        rewardTokensAddress: ["0xC25AF3123d2420054c8fcd144c21113aa2853F39"],
        yield: 0,
        yieldType: "fixed",
        totalFarm: 0.0,
        term: "ENDED",
        totalFarmToken: 0,
        youFarm: 0,
        fee: 0.1,
        yourReward: 0,
        balance: 0.0,
        usdValueStakeToken: 22.5708308516,
        usdValueRewardTokens: [0.19161582617754086],
        network: "BSC",
        stakingPoolAddress: "0x5ff6f49ad762962cea868866a65d4a14acb11563",
    },
    {
        key: 4,
        name: "GEM/XGT",
        idoPool: false,
        live: false,
        value: "BEP20",
        stakeToken: "GEM",
        shortStakeToken: "GEM",
        stakeTokenImage: "gem",
        stakeTokenAddress: "0xbac1df744df160877cdc45e13d0394c06bc388ff",
        doubleIcon: false,
        rewardTokens: ["XGT"],
        rewardTokensAddress: ["0xC25AF3123d2420054c8fcd144c21113aa2853F39"],
        yield: 0.004706790123,
        yieldType: "variable",
        totalFarm: 0.0,
        term: "",
        totalFarmToken: 0,
        youFarm: 0,
        fee: 0.1,
        yourReward: 0,
        balance: 0.0,
        usdValueStakeToken: 0.303504,
        usdValueRewardTokens: [0.200435],
        network: "BSC",
        stakingPoolAddress: "0x19767f2BF827bcfB094f897527e2836A9f940bE4",
    },
    {
        key: 5,
        name: "XGT/GEM",
        idoPool: false,
        live: false,
        value: "BEP20",
        stakeToken: "XGT",
        shortStakeToken: "XGT",
        stakeTokenImage: "xgt",
        stakeTokenAddress: "0xC25AF3123d2420054c8fcd144c21113aa2853F39",
        doubleIcon: false,
        rewardTokens: ["GEM"],
        rewardTokensAddress: ["0xbac1df744df160877cdc45e13d0394c06bc388ff"],
        yield: 0.002175925926,
        yieldType: "variable",
        totalFarm: 0.0,
        term: "",
        totalFarmToken: 0,
        youFarm: 0,
        fee: 0.1,
        yourReward: 0,
        balance: 0.0,
        usdValueStakeToken: 0.200435,
        usdValueRewardTokens: [0.303504],
        network: "BSC",
        stakingPoolAddress: "0xfbA34043cb60bb3cFc6879432b2e355b79B518e8",
    },
    {
        key: 6,
        name: "XGT IDO/INO",
        idoPool: true,
        live: true,
        value: "BEP20",
        stakeToken: "XGT",
        shortStakeToken: "XGT",
        stakeTokenImage: "xgt",
        stakeTokenAddress: "0xC25AF3123d2420054c8fcd144c21113aa2853F39",
        doubleIcon: false,
        rewardTokens: ["XGT"],
        rewardTokensAddress: ["0xC25AF3123d2420054c8fcd144c21113aa2853F39"],
        yield: 40,
        yieldType: "fixed",
        totalFarm: 0.0,
        term: "5 DAYS",
        totalFarmToken: 0,
        youFarm: 0,
        fee: 0,
        yourReward: 0,
        balance: 0.0,
        usdValueStakeToken: 0.04,
        usdValueRewardTokens: [0.04],
        network: "BSC",
        stakingPoolAddress: "0x55DA5d19369F0674E94CDd1780475d8C1b3bAC5b",
    },
    {
        key: 7,
        name: "BNB IDO/INO",
        idoPool: true,
        live: true,
        value: "BEP20",
        stakeToken: "XGT/BNB-LP",
        shortStakeToken: "LP",
        stakeTokenImage: "bnb-lp",
        stakeTokenAddress: "0x4de0ed25fed42de0d22fa9181aed7f4e42b583e9",
        doubleIcon: true,
        rewardTokens: ["XGT"],
        rewardTokensAddress: ["0xC25AF3123d2420054c8fcd144c21113aa2853F39"],
        yield: 40,
        yieldType: "fixed",
        totalFarm: 0.0,
        term: "5 DAYS",
        totalFarmToken: 0,
        youFarm: 0,
        fee: 0,
        yourReward: 0,
        balance: 0.0,
        usdValueStakeToken: 0.075,
        usdValueRewardTokens: [0.075],
        network: "BSC",
        stakingPoolAddress: "0x04fc81683505B2555c873899d1452eDda1670Ff8",
    },
];

function stakingPool_update_totalFarm(key, totalFarm) {
    $("#total_farm_" + key).html(totalFarm);
}

function stakingPool_update_endTime(key, diff) {
    let day = 60 * 60 * 24;
    let hour = 60 * 60;
    let minute = 60;
    let time;
    if (diff >= 31536000) {
        time = "∞ DAYS";
    } else if (diff >= 31 * day) {
        time =
            parseFloat((diff - (diff % (day * 31))) / (day * 31)).toFixed(0) +
            " MOS";
    } else if (diff > 2 * day) {
        time = parseFloat((diff - (diff % day)) / day).toFixed(0) + " DAYS";
    } else if (diff > hour) {
        time = parseFloat((diff - (diff % hour)) / hour).toFixed(0) + " HOURS";
    } else if (diff > minute) {
        time =
            parseFloat((diff - (diff % minute)) / minute).toFixed(0) + "MINS";
    } else {
        time = parseFloat(diff).toFixed(0) + "s";
    }
    if (diff == 0) {
        time = "ENDED";
        if (!$("#switch_farm_" + key).hasClass("disabled-regular")) {
            $("#switch_farm_" + key).addClass("disabled-regular");
        }
        if (!$("#switch_unfarm_" + key).hasClass("active")) {
            $("#switch_farm_" + key).removeClass("active");
            $("#switch_unfarm_" + key).addClass("active");
        }
    }
    $("#term_" + key).html(time);
}

function stakingPool_hasEnded(key) {
    return $("#term_" + key)
        .html()
        .includes("ENDED");
}

function stakingPool_update_yield(key, apy) {
    $("#yield_" + key).html(apy);
    $("#apy_" + key).html(apy);
}

function stakingPool_update_totalFarmToken(key, totalFarmToken) {
    $("#total_farm_token_" + key).html(totalFarmToken);
}

function stakingPool_update_youFarm(key, youFarm) {
    $("#you_farm_" + key).html(youFarm);
}

async function stakingPool_update_yourReward(key, yourReward) {
    if ($("#your_reward_" + key).html() != yourReward) {
        $("#your_reward_" + key).addClass("pulsing");
        await sleep(1000);
        $("#your_reward_" + key).html(yourReward);
        $("#your_reward_" + key).removeClass("pulsing");
    } else {
        $("#your_reward_" + key).html(yourReward);
    }
}

async function stakingPool_update_yourTier(value) {
    if (value > 0) {
        let newLevel = "NONE";
        if (value >= 58000) {
            newLevel = "ELITE";
        } else if (value >= 29000) {
            newLevel = "VETERAN";
        } else if (value >= 16000) {
            newLevel = "PRO";
        } else if (value >= 2000) {
            newLevel = "ROOKIE";
        } else if (value >= 250) {
            newLevel = "ROOKIE X";
        }

        if ($("#ido-tier-name").html() != newLevel) {
            $("#ido-tier-name").addClass("pulsing");
            await sleep(1000);
            $("#ido-tier-name").html(newLevel);
            $("#ido-tier-name").removeClass("pulsing");
        }
    }
}

function stakingPool_set_Locked(key, diff) {
    if (diff == 0) {
        $("#switch_unfarm_" + key).html("UNFARM");
        if ($("#switch_unfarm_" + key).hasClass("disabled")) {
            $("#switch_unfarm_" + key).removeClass("disabled");
        }
        return;
    }
    if (!$("#lock-button-" + key).hasClass("lock-disabled")) {
        $("#lock-button-" + key).addClass("lock-disabled");
    }
    $("#lock-button-" + key).text("IDO-Lock");
    if (!$("#switch_unfarm_" + key).hasClass("disabled")) {
        $("#switch_unfarm_" + key).addClass("disabled");
    }

    let day = 60 * 60 * 24;
    let hour = 60 * 60;
    let minute = 60;
    let time;
    if (diff > 2 * day) {
        time = parseFloat((diff - (diff % day)) / day).toFixed(0) + "D";
    } else if (diff > hour) {
        time = parseFloat((diff - (diff % hour)) / hour).toFixed(0) + "H";
    } else if (diff > minute) {
        time = parseFloat((diff - (diff % minute)) / minute).toFixed(0) + "M";
    } else {
        time = parseFloat(diff).toFixed(0) + "s";
    }
    $("#switch_unfarm_" + key).html("UNFARM IN " + time);
}

function stakingPool_set_Lockable(key) {
    if ($("#lock-button-" + key).hasClass("lock-disabled")) {
        $("#lock-button-" + key).removeClass("lock-disabled");
    }
    $("#lock-button-" + key).text("Lock");
    if ($("#switch_unfarm_" + key).hasClass("disabled")) {
        $("#switch_unfarm_" + key).removeClass("disabled");
    }
    $("#switch_unfarm_" + key).html("UNFARM");
}

function stakingPool_set_not_Lockable(key) {
    if (!$("#lock-button-" + key).hasClass("lock-disabled")) {
        $("#lock-button-" + key).addClass("lock-disabled");
    }
    $("#lock-button-" + key).text("Auto-Lock");
    if ($("#switch_unfarm_" + key).hasClass("disabled")) {
        $("#switch_unfarm_" + key).removeClass("disabled");
    }
    $("#switch_unfarm_" + key).html("UNFARM");
}

function stakingPool_update_balance(key, balance) {
    $("#balance_" + key).html(balance);
}

function stakingPool_set_lockSoon(key, diff) {
    if (diff == 0) {
        $("#lock_status_" + key).hide();
        return;
    }

    let day = 60 * 60 * 24;
    let hour = 60 * 60;
    let minute = 60;
    let time;
    if (diff > 2 * day) {
        time = parseFloat((diff - (diff % day)) / day).toFixed(0) + "D";
    } else if (diff > hour) {
        time = parseFloat((diff - (diff % hour)) / hour).toFixed(0) + "H";
    } else if (diff > minute) {
        time = parseFloat((diff - (diff % minute)) / minute).toFixed(0) + "M";
    } else {
        time = parseFloat(diff).toFixed(0) + "S";
    }
    $("#lock_duration_" + key).html(time);
    $("#lock_status_" + key).show();
}

///// Blockchain Interactions //////

let currentActionKey = -1;
let lastAllowanceTime;
let lastAllowanceAmount;
let lastAllowanceKey;

async function updateRates(forPoolKey) {
    if (typeof forPoolKey === "undefined") {
        forPoolKey = 9999;
    }
    if (forPoolKey >= 0) {
        while (typeof latestInfo == "undefined") {
            await sleep(30);
        }
    }

    // pool 0
    if (forPoolKey == 9999 || forPoolKey == 0) {
        farmData[0].usdValueStakeToken = [latestInfo.xgt_price_xdai];
        farmData[0].usdValueRewardTokens = [latestInfo.xgt_price_xdai];
    }

    // pool 1
    if (forPoolKey == 9999 || forPoolKey == 1) {
        farmData[1].usdValueStakeToken =
            latestInfo.total_pool_value[0] / latestInfo.total_pool_tokens[0];
        farmData[1].usdValueRewardTokens = [latestInfo.xgt_price_xdai];
    }

    let gemPrice;
    if (forPoolKey == 9999 || forPoolKey == 4 || forPoolKey == 5) {
        for (let i = 0; i < latestInfo.partner_token_names.length; i++) {
            if (latestInfo.partner_token_names[i] == "GEM") {
                gemPrice = parseFloat(latestInfo.partner_token_prices[i]);
                break;
            }
        }
    }
    // pool 4
    if (forPoolKey == 9999 || forPoolKey == 4) {
        farmData[4].usdValueStakeToken = gemPrice;
        farmData[4].usdValueRewardTokens = [latestInfo.xgt_price_bsc];
    }

    // pool 5
    if (forPoolKey == 9999 || forPoolKey == 5) {
        farmData[5].usdValueStakeToken = [latestInfo.xgt_price_bsc];
        farmData[5].usdValueRewardTokens = [gemPrice];
    }

    // pool 2
    if (forPoolKey == 9999 || forPoolKey == 2) {
        farmData[2].usdValueStakeToken =
            latestInfo.total_pool_value[0] / latestInfo.total_pool_tokens[0];
        farmData[2].usdValueRewardTokens = [latestInfo.xgt_price_xdai];
    }

    // pool 3
    if (forPoolKey == 9999 || forPoolKey == 3) {
        farmData[3].usdValueStakeToken =
            latestInfo.total_pool_value[1] / latestInfo.total_pool_tokens[1];
        farmData[3].usdValueRewardTokens = [latestInfo.xgt_price_bsc];
    }

    // pool 6
    if (forPoolKey == 9999 || forPoolKey == 6) {
        farmData[6].usdValueStakeToken = [latestInfo.xgt_price_bsc];
        farmData[6].usdValueRewardTokens = [latestInfo.xgt_price_bsc];
    }

    // pool 7
    if (forPoolKey == 9999 || forPoolKey == 7) {
        farmData[7].usdValueStakeToken =
            latestInfo.total_pool_value[1] / latestInfo.total_pool_tokens[1];
        farmData[7].usdValueRewardTokens = [latestInfo.xgt_price_bsc];
    }
}

async function loadLivePoolData(key) {
    let inputArray = farmData;
    if (typeof key !== "undefined") {
        inputArray = [
            farmData[key],
            {stakingPoolAddress: "0x0000000000000000000000000000000000000000"},
        ];
        await updateRates(key);
    } else {
        await updateRates();
    }
    let xgtInLockPools = 0;
    for (let pool of inputArray) {
        let thisWeb3;
        if (pool.network == "xDAI") {
            thisWeb3 = web3xDai;
        } else {
            thisWeb3 = web3bsc;
        }
        if (
            pool.stakingPoolAddress !=
            "0x0000000000000000000000000000000000000000"
        ) {
            let stakingContract;
            if (pool.idoPool) {
                stakingContract = new thisWeb3.eth.Contract(
                    abiLockStaking,
                    pool.stakingPoolAddress,
                    null
                );
            } else {
                stakingContract = new thisWeb3.eth.Contract(
                    abiStakingv2,
                    pool.stakingPoolAddress,
                    null
                );
            }
            let totalStake;
            try {
                totalStake = await stakingContract.methods.totalStaked().call();
            } catch (e) {
                totalStake = 0;
                if (e.toString().indexOf("execution reverted") == -1) {
                    console.log(e);
                }
            }
            let displayValue = parseFloat(
                thisWeb3.utils.fromWei(totalStake.toString())
            ).toFixed(0);
            if (displayValue == 0) {
                displayValue = parseFloat(
                    thisWeb3.utils.fromWei(totalStake.toString())
                ).toFixed(2);
                if (displayValue == 0) {
                    displayValue = 0;
                }
            }
            stakingPool_update_totalFarmToken(pool.key, displayValue);

            let totalFarmedUSD = parseFloat(
                parseFloat(thisWeb3.utils.fromWei(totalStake.toString())) *
                    pool.usdValueStakeToken
            ).toFixed(0);

            if (totalFarmedUSD - parseFloat(totalFarmedUSD).toFixed(0) == 0) {
                totalFarmedUSD = parseFloat(totalFarmedUSD).toFixed(0);
            }
            stakingPool_update_totalFarm(pool.key, totalFarmedUSD);
            let userInfo = null;
            try {
                userInfo = await stakingContract.methods
                    .userInfo(selectedAccount)
                    .call();
            } catch (e) {}

            if (pool.idoPool) {
                let userStakeInXGT = 0;
                if (userInfo != null) {
                    userStakeInXGT = userInfo.stake;
                }
                let userStakeReadable = parseFloat(
                    thisWeb3.utils.fromWei(userStakeInXGT.toString())
                );
                if (userStakeReadable > 0) {
                    let modifier = await stakingContract.methods
                        .getXGTperStakedToken()
                        .call();
                    let modifierReadable = parseFloat(
                        thisWeb3.utils.fromWei(modifier.toString())
                    );

                    userStakeReadable = parseFloat(
                        userStakeReadable * modifierReadable
                    ).toFixed(2);
                }
                xgtInLockPools += parseFloat(userStakeReadable);
                let nextCutOff = 0;
                try {
                    nextCutOff = await stakingContract.methods
                        .nextCutOff()
                        .call();
                } catch (e) {}
                let now = Math.round(new Date().getTime() / 1000);
                if (
                    parseFloat(nextCutOff) > parseFloat(now) &&
                    userStakeReadable > 0
                ) {
                    stakingPool_set_lockSoon(pool.key, nextCutOff - now);
                } else if (
                    parseFloat(nextCutOff) <= parseFloat(now) &&
                    userStakeReadable > 0
                ) {
                    stakingPool_set_lockSoon(pool.key, 0);
                }

                let nextUnlock = 0;
                try {
                    nextUnlock = await stakingContract.methods
                        .nextUnlock()
                        .call();
                } catch (e) {}

                let unlockIn = 0;
                if (parseFloat(nextUnlock) > parseFloat(now)) {
                    unlockIn = nextUnlock - now;
                }
                if (parseFloat(nextCutOff) < parseFloat(now)) {
                    stakingPool_set_Locked(pool.key, unlockIn);
                }
                let isAutoLockPool = await stakingContract.methods
                    .autoLock()
                    .call();
                let userIsLocked = true;
                try {
                    userIsLocked = await stakingContract.methods
                        .userIsLocked(selectedAccount)
                        .call();
                } catch (e) {}

                if (isAutoLockPool) {
                    if (!userIsLocked) {
                        stakingPool_set_not_Lockable(pool.key);
                    }
                } else {
                    if (!userIsLocked) {
                        stakingPool_set_Lockable(pool.key);
                    }
                }
            } else {
                let poolEnd = 0;
                try {
                    poolEnd = await stakingContract.methods.end().call();
                } catch (e) {}
                thisTime = Date.now() / 1000;
                if (pool.term == "") {
                    if (parseFloat(poolEnd) > parseFloat(thisTime)) {
                        stakingPool_update_endTime(
                            pool.key,
                            parseFloat(poolEnd) - parseFloat(thisTime)
                        );
                    } else {
                        stakingPool_update_endTime(pool.key, 0);
                    }
                }
            }

            if (userInfo != null) {
                stakedStakeTokenBalancesWei[pool.key] = userInfo.stake;
                let readbleStakingBalance = parseFloat(
                    thisWeb3.utils.fromWei(userInfo.stake.toString())
                ).toFixed(6);
                stakedStakeTokenBalancesReadable[pool.key] =
                    readbleStakingBalance;

                totalFarmingValues[pool.key] =
                    parseFloat(
                        thisWeb3.utils.fromWei(userInfo.stake.toString())
                    ) * pool.usdValueStakeToken;
            }

            let rawYield;
            if (pool.yieldType == "variable") {
                if (stakingPool_hasEnded(pool.key)) {
                    farmData[pool.key].live = false;
                    stakingPool_update_yield(pool.key, 0);
                    if ($("#view_live").hasClass("active")) {
                        if (
                            !$("#farm_item_" + pool.key).hasClass("pool-hidden")
                        ) {
                            $("#farm_item_" + pool.key).addClass("pool-hidden");
                        }
                    }
                } else {
                    let term;
                    if (pool.key == 2 || pool.key == 3) {
                        term = 30;
                    }
                    let yieldValue =
                        pool.yield *
                        term *
                        24 *
                        60 *
                        60 *
                        pool.usdValueRewardTokens[0];

                    let totalTokens = parseFloat(
                        thisWeb3.utils.fromWei(totalStake.toString())
                    );
                    if (totalTokens == 0) {
                        totalTokens = 1;
                    }
                    totalTokens = parseFloat(totalTokens).toFixed(0);

                    let totalFarmedUSD_here = totalFarmedUSD; // total in pool overall
                    if (
                        isNaN(totalFarmedUSD_here) ||
                        totalFarmedUSD_here == 0
                    ) {
                        totalFarmedUSD_here = 1;
                    }

                    let yieldPersonal = parseFloat(
                        (yieldValue / totalFarmedUSD_here / term) * 30 * 100
                    ).toFixed(0);

                    let yieldPrint = yieldPersonal * pool.rewardTokens.length;
                    rawYield = yieldPrint;
                    if (yieldPrint < 2000) {
                        yieldPrint = parseFloat(yieldPrint).toFixed(0);
                    } else if (yieldPrint >= 2000 && yieldPrint < 1000000) {
                        yieldPrint =
                            parseFloat(yieldPrint / 1000).toFixed(0) + "k";
                    } else {
                        yieldPrint =
                            parseFloat(yieldPrint / 1000000).toFixed(0) + "m";
                    }
                    stakingPool_update_yield(pool.key, yieldPrint);
                }
            } else {
                let yield = pool.yield * pool.rewardTokens.length;
                rawYield = yield / 12;
                stakingPool_update_yield(pool.key, yield);
            }

            if (userInfo != null && userInfo.stake != "0") {
                let displayValue = parseFloat(
                    thisWeb3.utils.fromWei(userInfo.stake.toString())
                ).toFixed(0);
                if (displayValue == 0) {
                    displayValue = parseFloat(
                        thisWeb3.utils.fromWei(userInfo.stake.toString())
                    ).toFixed(2);
                    if (displayValue == 0) {
                        displayValue = 0;
                    }
                }
                stakingPool_update_youFarm(pool.key, displayValue);
                if (pool.live) {
                    totalMonthlyReturnValues[pool.key] = rawYield;
                }
            } else {
                stakingPool_update_youFarm(pool.key, 0);
                totalMonthlyReturnValues[pool.key] = 0;
            }

            let rewards = 0;

            if (pool.idoPool) {
                try {
                    let thisRewardToken = await stakingContract.methods
                        .getCurrentUserReward(selectedAccount)
                        .call();
                    rewards +=
                        parseFloat(
                            thisWeb3.utils.fromWei(thisRewardToken.toString())
                        ) * pool.usdValueRewardTokens[0];
                } catch (e) {}
            } else {
                for (let i = 0; i < pool.rewardTokensAddress.length; i++) {
                    try {
                        let thisRewardToken = await stakingContract.methods
                            .getCurrentUserReward(selectedAccount, i)
                            .call();

                        rewards +=
                            parseFloat(
                                thisWeb3.utils.fromWei(
                                    thisRewardToken.toString()
                                )
                            ) * pool.usdValueRewardTokens[i];
                    } catch (e) {}
                }
            }

            totalFarmingValues[pool.key] += rewards;
            rewards = parseFloat(
                rewards / pool.usdValueRewardTokens[i]
            ).toFixed(2);
            if (rewards == 0) {
                rewards = 0;
            }

            stakingPool_update_yourReward(pool.key, rewards);

            let stakingTokenContract = new thisWeb3.eth.Contract(
                abiXGT,
                pool.stakeTokenAddress,
                null
            );
            let userBalance = 0;
            try {
                userBalance = await stakingTokenContract.methods
                    .balanceOf(selectedAccount)
                    .call();
            } catch (e) {}
            stakeTokenBalancesWei[pool.key] = userBalance;
            let readbleBalance = parseFloat(
                thisWeb3.utils.fromWei(userBalance.toString())
            ).toFixed(6);
            stakeTokenBalancesReadable[pool.key] = readbleBalance;
            if (readbleBalance - parseFloat(readbleBalance).toFixed(0) == 0) {
                readbleBalance = parseFloat(readbleBalance).toFixed(0);
            } else {
                readbleBalance = parseFloat(readbleBalance).toFixed(2);
            }
            stakingPool_update_balance(pool.key, readbleBalance);
        }
    }

    if (typeof key == "undefined") {
        stakingPool_update_yourTier(xgtInLockPools);
    }

    let totalFarmingValue = 0;
    for (let i = 0; i < totalFarmingValues.length; i++) {
        totalFarmingValue += totalFarmingValues[i];
    }

    $("#farm-balance").html(
        Number(parseFloat(totalFarmingValue).toFixed(2)).toLocaleString("en-US")
    );
    $("#farm-balance").removeClass("pulsing");

    let totalMonthlyReturnValue = 0;
    for (let i = 0; i < totalMonthlyReturnValues.length; i++) {
        if (totalMonthlyReturnValues[i] > 0) {
            totalMonthlyReturnValue += totalMonthlyReturnValues[i];
        }
    }

    if (totalMonthlyReturnValue < 2000) {
        totalMonthlyReturnValue = parseFloat(totalMonthlyReturnValue).toFixed(
            0
        );
    } else if (
        totalMonthlyReturnValue >= 2000 &&
        totalMonthlyReturnValue < 1000000
    ) {
        totalMonthlyReturnValue =
            parseFloat(totalMonthlyReturnValue / 1000).toFixed(0) + "k";
    } else {
        totalMonthlyReturnValue =
            parseFloat(totalMonthlyReturnValue / 1000000).toFixed(0) + "m";
    }

    $("#returns-month").html(totalMonthlyReturnValue);
    $("#returns-month").removeClass("pulsing");
    startRewardPoller();
}

async function loadShopPageData(key) {
    let inputArray = farmData;
    await updateRates();

    let xgtInLockPools = 0;
    for (let pool of inputArray) {
        let thisWeb3;
        if (pool.network == "xDAI") {
            thisWeb3 = web3xDai;
        } else {
            thisWeb3 = web3bsc;
        }
        if (
            pool.stakingPoolAddress !=
            "0x0000000000000000000000000000000000000000"
        ) {
            let stakingContract;
            if (pool.idoPool) {
                stakingContract = new thisWeb3.eth.Contract(
                    abiLockStaking,
                    pool.stakingPoolAddress,
                    null
                );
            } else {
                continue;
            }

            let userInfo = null;
            try {
                userInfo = await stakingContract.methods
                    .userInfo(selectedAccount)
                    .call();
            } catch (e) {}

            let userStakeInXGT = 0;
            if (userInfo != null) {
                userStakeInXGT = userInfo.stake;
            }
            let userStakeReadable = parseFloat(
                thisWeb3.utils.fromWei(userStakeInXGT.toString())
            );
            if (userStakeReadable > 0) {
                let modifier = await stakingContract.methods
                    .getXGTperStakedToken()
                    .call();
                let modifierReadable = parseFloat(
                    thisWeb3.utils.fromWei(modifier.toString())
                );

                userStakeReadable = parseFloat(
                    userStakeReadable * modifierReadable
                ).toFixed(2);
            }
            xgtInLockPools += parseFloat(userStakeReadable);
        }
    }

    if (typeof key == "undefined") {
        stakingPool_update_yourTier(xgtInLockPools);
    }
    startRewardPoller();
}

async function startRewardPoller() {
    if (!rewardPollerRunning) {
        rewardPollerRunning = true;
        rewardPoller();
    }
}

async function stopRewardPoller() {
    if (rewardPollerRunning) {
        rewardPollerRunning = false;
    }
}

async function rewardPoller() {
    let counter = 0;
    while (rewardPollerRunning) {
        if (counter % 2 == 1 || window.location.href.indexOf("shop") > -1) {
            console.log("Refresh run");
            if (window.location.href.indexOf("shop") == -1) {
                loadLivePoolData();
            } else {
                loadShopPageData();
            }
        } else {
            for (let i = 0; i < farmData.length; i++) {
                let thisWeb3;
                if (farmData[i].network == "xDAI") {
                    thisWeb3 = web3xDai;
                } else {
                    thisWeb3 = web3bsc;
                }
                let stakingContract;
                if (farmData[i].idoPool) {
                    stakingContract = new thisWeb3.eth.Contract(
                        abiLockStaking,
                        farmData[i].stakingPoolAddress,
                        null
                    );
                } else {
                    stakingContract = new thisWeb3.eth.Contract(
                        abiStakingv2,
                        farmData[i].stakingPoolAddress,
                        null
                    );
                }
                let rewards = 0;
                if (!farmData[i].idoPool) {
                    for (
                        let j = 0;
                        j < farmData[i].rewardTokensAddress.length;
                        j++
                    ) {
                        let thisRewardToken = 0;
                        try {
                            thisRewardToken = await stakingContract.methods
                                .getCurrentUserReward(selectedAccount, j)
                                .call();
                        } catch (e) {}
                        rewards +=
                            parseFloat(
                                thisWeb3.utils.fromWei(
                                    thisRewardToken.toString()
                                )
                            ) * farmData[i].usdValueRewardTokens[j];
                    }
                } else {
                    let thisRewardToken = 0;
                    try {
                        thisRewardToken = await stakingContract.methods
                            .getCurrentUserReward(selectedAccount)
                            .call();
                    } catch (e) {}
                    rewards +=
                        parseFloat(
                            thisWeb3.utils.fromWei(thisRewardToken.toString())
                        ) * farmData[i].usdValueRewardTokens[0];
                }
                totalFarmingValues[i] += rewards;

                rewards = parseFloat(
                    rewards / farmData[i].usdValueRewardTokens[0]
                ).toFixed(2);
                if (rewards == 0) {
                    rewards = 0;
                }

                stakingPool_update_yourReward(i, rewards);
            }
        }
        counter++;
        await sleep(5000);
    }
}

async function startStaking(key) {
    let thisWeb3;
    if (farmData[key].network == "xDAI") {
        thisWeb3 = web3xDai;
    } else {
        thisWeb3 = web3bsc;
    }
    if ($("#detail_stakeToken_" + key).val() == "") {
        return;
    }
    if ($("#switch_farm_" + key).hasClass("active")) {
        if ($("#balance_input_" + key).hasClass("redInputStaking")) {
            $("#error-popup-money-stake").addClass("popup_open");
            return;
        }
        await checkConnected();
        let id;
        if (farmData[key].network == "xDAI") {
            id = xdaiId;
        } else if (farmData[key].network == "BSC") {
            id = bscId;
        } else {
            return;
        }
        let networkOk = await waitForSwitch(id, "stake");
        if (!networkOk) {
            return;
        }

        $('[id^="stakeTokenDescriptor"]').html(farmData[key].stakeToken);

        $('[id^="generalStakeTokenDescriptor"]').html(
            farmData[key].shortStakeToken
        );

        currentActionKey = key;

        let amount = thisWeb3.utils.toWei(
            new Big($("#detail_stakeToken_" + key).val())
                .toFixed(10)
                .toString(),
            "ether"
        );

        $('strong[id^="stake-token-amount"]').html(
            $("#detail_stakeToken_" + key).val()
        );

        let total = parseFloat($("#detail_stakeToken_" + key).val()).toFixed(2);

        if (
            total -
                parseFloat($("#detail_stakeToken_" + key).val()).toFixed(0) ==
            0
        ) {
            total = parseFloat(total).toFixed(0);
        }
        $('strong[id^="stake-total"]').html(total);
        $('strong[id^="stake-fee"]').html("<0.01");

        let stakeTokenContract = new thisWeb3.eth.Contract(
            abiXGT,
            farmData[key].stakeTokenAddress,
            null
        );
        let allowance = await stakeTokenContract.methods
            .allowance(selectedAccount, farmData[key].stakingPoolAddress)
            .call();
        if (new Big(allowance).mul(new Big(10 ** 18)).lt(new Big(amount))) {
            $("#confirm_approval").addClass("popup_open");
        } else {
            $("#confirm_stake_1").addClass("popup_open");
        }
    } else {
        if ($("#balance_input_" + key).hasClass("redInputStaking")) {
            $("#error-popup-money-staked").addClass("popup_open");
            return;
        }
        await checkConnected();
        let id;
        if (farmData[key].network == "xDAI") {
            id = xdaiId;
        } else if (farmData[key].network == "BSC") {
            id = bscId;
        } else {
            return;
        }
        let networkOk = await waitForSwitch(id, "unstake");
        if (!networkOk) {
            return;
        }

        $('[id^="stakeTokenDescriptor"]').html(farmData[key].stakeToken);

        $('[id^="generalStakeTokenDescriptor"]').html(
            farmData[key].shortStakeToken
        );

        currentActionKey = key;

        let amount = thisWeb3.utils.toWei(
            new Big($("#detail_stakeToken_" + key).val())
                .toFixed(10)
                .toString(),
            "ether"
        );

        $('strong[id^="stake-token-amount"]').html(
            $("#detail_stakeToken_" + key).val()
        );

        let total = parseFloat($("#detail_stakeToken_" + key).val()).toFixed(2);

        if (
            total -
                parseFloat($("#detail_stakeToken_" + key).val()).toFixed(0) ==
            0
        ) {
            total = parseFloat(total).toFixed(0);
        }
        $('strong[id^="stake-total"]').html(total);
        $('strong[id^="stake-fee"]').html("<0.01");

        $("#confirm_unstake").addClass("popup_open");
    }
}

async function stake_Approve() {
    await checkConnected();
    let id;
    if (farmData[currentActionKey].network == "xDAI") {
        id = xdaiId;
    } else if (farmData[currentActionKey].network == "BSC") {
        id = bscId;
    } else {
        return;
    }

    let networkOk = await waitForSwitch(id, "stake");
    if (!networkOk) {
        return;
    }
    let amount = new Big(
        web3.utils
            .toWei($("#detail_stakeToken_" + currentActionKey).val(), "ether")
            .toString()
    );
    amount = amount.toFixed(0);
    $("#confirm_approval").removeClass("popup_open");
    $("#wait_purpose").html(
        "Waiting for the approval transaction to finish..."
    );
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("STAKING");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        stake_Approve();
    });
    refreshBalance();

    let stakeTokenContract = new web3.eth.Contract(
        abiXGT,
        farmData[currentActionKey].stakeTokenAddress,
        null
    );
    try {
        let currentUserBalance = await stakeTokenContract.methods
            .balanceOf(selectedAccount)
            .call();
        let floatCurrentUserBalance = parseFloat(
            web3xDai.utils.fromWei(currentUserBalance.toString())
        ).toFixed(6);
        if (
            floatCurrentUserBalance -
                parseFloat(
                    $("#detail_stakeToken_" + currentActionKey).val()
                ).toFixed(6) <=
            0.5
        ) {
            amount = currentUserBalance;
        }
        let maxAmount = new Big(
            web3.utils.toWei("999999999999999", "ether").toString()
        );
        maxAmount = maxAmount.toFixed(0);

        let txReturn;
        txReturn = await stakeTokenContract.methods
            .approve(
                farmData[currentActionKey].stakingPoolAddress,
                maxAmount.toString()
            )
            .send({
                from: selectedAccount,
            });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            lastAllowanceTime = Date.now() / 1000;
            lastAllowanceKey = currentActionKey;
            lastAllowanceAmount = amount;
            $('strong[id^="stake-fee"]').html("0.00");
            $("#confirm_stake_2").addClass("popup_open");
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

async function stake_Final() {
    refreshBalance();
    let amount;
    if (
        lastAllowanceKey == currentActionKey &&
        lastAllowanceTime + 15 * 60 >= Date.now() / 1000
    ) {
        // if key is correct and the allowance time is not older than
        // 15 minutes it's considered fresh and valid
        amount = lastAllowanceAmount;
    } else {
        amount = new Big(
            web3.utils
                .toWei(
                    $("#detail_stakeToken_" + currentActionKey).val(),
                    "ether"
                )
                .toString()
        );
        amount = amount.toFixed(0);
    }

    let txUrl;
    if (farmData[currentActionKey].network == "xDAI") {
        txUrl = txUrlXDai;
    } else if (farmData[currentActionKey].network == "BSC") {
        txUrl = txUrlBSC;
    } else {
        return;
    }

    let stakingContract = new web3.eth.Contract(
        abiStakingv2,
        farmData[currentActionKey].stakingPoolAddress,
        null
    );

    $("#confirm_stake_1").removeClass("popup_open");
    $("#confirm_stake_2").removeClass("popup_open");
    $("#wait_purpose").html("Waiting for the staking transaction to finish...");
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("STAKING");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        stake_Final();
    });
    let stakeTokenContract = new web3.eth.Contract(
        abiXGT,
        farmData[currentActionKey].stakeTokenAddress,
        null
    );
    try {
        let currentUserBalance = await stakeTokenContract.methods
            .balanceOf(selectedAccount)
            .call();
        let floatCurrentUserBalance = parseFloat(
            web3xDai.utils.fromWei(currentUserBalance.toString())
        ).toFixed(6);
        if (
            floatCurrentUserBalance -
                parseFloat(
                    $("#detail_stakeToken_" + currentActionKey).val()
                ).toFixed(6) <=
            0.5
        ) {
            amount = currentUserBalance;
        }

        let txReturn = await stakingContract.methods
            .deposit(
                amount.toString(),
                "0x0000000000000000000000000000000000000000"
            )
            .send({
                from: selectedAccount,
            });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            setTokenInput(0, currentActionKey);
            loadLivePoolData(currentActionKey);
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrl + txReturn.transactionHash, "_blank");
            });
            $("#stake-success").addClass("popup_open");
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

async function unstake_Final() {
    let amount = new Big(
        web3.utils
            .toWei($("#detail_stakeToken_" + currentActionKey).val(), "ether")
            .toString()
    );
    amount = amount.toFixed(0);

    let txUrl;
    if (farmData[currentActionKey].network == "xDAI") {
        txUrl = txUrlXDai;
    } else if (farmData[currentActionKey].network == "BSC") {
        txUrl = txUrlBSC;
    } else {
        return;
    }

    let stakingContract = new web3.eth.Contract(
        abiStakingv2,
        farmData[currentActionKey].stakingPoolAddress,
        null
    );

    $("#confirm_unstake").removeClass("popup_open");
    $("#wait_purpose").html(
        "Waiting for the unstaking transaction to finish..."
    );
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("UNSTAKING");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        stake_Final();
    });

    try {
        let txReturn;
        let currentUserInfo = await stakingContract.methods
            .userInfo(selectedAccount)
            .call();
        let floatCurrentStakeBalance = parseFloat(
            web3xDai.utils.fromWei(currentUserInfo["stake"].toString())
        ).toFixed(6);

        if (
            floatCurrentStakeBalance -
                parseFloat(
                    $("#detail_stakeToken_" + currentActionKey).val()
                ).toFixed(6) <=
            0.5
        ) {
            txReturn = await stakingContract.methods.withdrawAll().send({
                from: selectedAccount,
            });
        } else {
            txReturn = await stakingContract.methods
                .withdraw(amount.toString())
                .send({
                    from: selectedAccount,
                });
        }
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            setTokenInput(0, currentActionKey);
            loadLivePoolData(currentActionKey);
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrl + txReturn.transactionHash, "_blank");
            });
            $("#unstake-success").addClass("popup_open");
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

async function harvest_start(key) {
    currentActionKey = key;

    await checkConnected();
    let id;
    if (farmData[currentActionKey].network == "xDAI") {
        id = xdaiId;
    } else if (farmData[currentActionKey].network == "BSC") {
        id = bscId;
    } else {
        return;
    }

    let networkOk = await waitForSwitch(id, "harvest");
    if (!networkOk) {
        return;
    }
    $("#pool-name").html(farmData[currentActionKey].name);
    $("#confirm_harvest").addClass("popup_open");
}
async function harvest_final() {
    $("#confirm_harvest").removeClass("popup_open");
    $("#wait_purpose").html("Waiting for the harvest transaction to finish...");
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("HARVEST");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        harvest_final();
    });

    let txUrl;
    if (farmData[currentActionKey].network == "xDAI") {
        txUrl = txUrlXDai;
    } else if (farmData[currentActionKey].network == "BSC") {
        txUrl = txUrlBSC;
    } else {
        return;
    }

    let stakingContract = new web3.eth.Contract(
        abiStakingv2,
        farmData[currentActionKey].stakingPoolAddress,
        null
    );
    try {
        let txReturn;
        txReturn = await stakingContract.methods.harvest().send({
            from: selectedAccount,
        });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            loadLivePoolData(currentActionKey);
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrl + txReturn.transactionHash, "_blank");
            });
            $("#harvest-success").addClass("popup_open");
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

async function harvest_start(key) {
    currentActionKey = key;

    await checkConnected();
    let id;
    if (farmData[currentActionKey].network == "xDAI") {
        id = xdaiId;
    } else if (farmData[currentActionKey].network == "BSC") {
        id = bscId;
    } else {
        return;
    }

    let networkOk = await waitForSwitch(id, "harvest");
    if (!networkOk) {
        return;
    }
    $("#pool-name").html(farmData[currentActionKey].name);
    $("#confirm_harvest").addClass("popup_open");
}

async function start_lock(key) {
    if ($("#lock-button-" + key).hasClass("lock-disabled")) {
        return;
    }
    currentActionKey = key;

    await checkConnected();
    let id;
    if (farmData[currentActionKey].network == "xDAI") {
        id = xdaiId;
    } else if (farmData[currentActionKey].network == "BSC") {
        id = bscId;
    } else {
        return;
    }

    let networkOk = await waitForSwitch(id, "lock");
    if (!networkOk) {
        return;
    }
    $("#pool-name").html(farmData[currentActionKey].name);
    $("#confirm_lock").addClass("popup_open");
}

async function lock() {
    $("#confirm_lock").removeClass("popup_open");
    $("#wait_purpose").html("Waiting for the locking transaction to finish...");
    $("#wait-popup").addClass("popup_open");
    $("#error-target").html("LOCK");
    $("#error-again").prop("onclick", null).off("click");
    $("#error-again").on("click", function () {
        $("#error-popup").removeClass("popup_open");
        lock();
    });

    let txUrl;
    if (farmData[currentActionKey].network == "xDAI") {
        txUrl = txUrlXDai;
    } else if (farmData[currentActionKey].network == "BSC") {
        txUrl = txUrlBSC;
    } else {
        return;
    }

    let stakingContract = new web3.eth.Contract(
        abiLockStaking,
        farmData[currentActionKey].stakingPoolAddress,
        null
    );
    try {
        let txReturn;
        txReturn = await stakingContract.methods.lock().send({
            from: selectedAccount,
        });
        $("#wait-popup").removeClass("popup_open");
        if (txReturn.status) {
            loadLivePoolData(currentActionKey);
            $('[id^="txlink"]').prop("onclick", null).off("click");
            $('[id^="txlink"]').on("click", function () {
                window.open(txUrl + txReturn.transactionHash, "_blank");
            });
            $("#lock-success").addClass("popup_open");
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

async function setTokenInput(percentage, key) {
    if ($("#switch_farm_" + key).hasClass("active")) {
        let amount = (stakeTokenBalancesReadable[key] * percentage) / 100;
        if (
            parseFloat(stakeTokenBalancesReadable[key]) -
                parseFloat(amount).toFixed(2) <
            0
        ) {
            amount = amount - 0.01;
        }
        $("#detail_stakeToken_" + key).val(parseFloat(amount).toFixed(2));
        $("#detail_stakeToken_" + key).trigger("input");
    } else {
        let amount = (stakedStakeTokenBalancesReadable[key] * percentage) / 100;
        if (
            parseFloat(stakedStakeTokenBalancesReadable[key]) -
                parseFloat(amount).toFixed(2) <
            0
        ) {
            amount = amount - 0.01;
        }
        $("#detail_stakeToken_" + key).val(parseFloat(amount).toFixed(2));
        $("#detail_stakeToken_" + key).trigger("input");
    }
}
async function switchPools(live) {
    for (let data of farmData) {
        if (live) {
            if (data.live) {
                if ($("#farm_item_" + data.key).hasClass("pool-hidden")) {
                    $("#farm_item_" + data.key).removeClass("pool-hidden");
                }
            } else {
                if (!$("#farm_item_" + data.key).hasClass("pool-hidden")) {
                    $("#farm_item_" + data.key).addClass("pool-hidden");
                }
            }
        } else {
            if (!data.live) {
                if ($("#farm_item_" + data.key).hasClass("pool-hidden")) {
                    $("#farm_item_" + data.key).removeClass("pool-hidden");
                }
            } else {
                if (!$("#farm_item_" + data.key).hasClass("pool-hidden")) {
                    $("#farm_item_" + data.key).addClass("pool-hidden");
                }
            }
        }
    }
}

async function switchView(live) {
    $("div[id*=farm_item_]").remove();
    for (let data of farmData) {
        const {
            key,
            name,
            idoPool,
            value,
            stakeToken,
            shortStakeToken,
            stakeTokenImage,
            doubleIcon,
            rewardTokens,
            yieldType,
            totalFarm,
            term,
            totalFarmToken,
            youFarm,
            fee,
            yourReward,
            balance,
        } = data;
        generateFarmBlock(
            key,
            name,
            idoPool,
            value,
            stakeToken,
            shortStakeToken,
            stakeTokenImage,
            doubleIcon,
            rewardTokens,
            yieldType,
            totalFarm,
            term,
            totalFarmToken,
            youFarm,
            fee,
            yourReward,
            balance
        );
        if (live == data.live) {
            $("#farm_item_" + data.key).removeClass("pool-hidden");
        }
    }

    loadLivePoolData();

    $('[id^="detail_stakeToken"]').on("input", async function () {
        let keyCandidates = ("" + this.id).split("_");
        let key = keyCandidates[keyCandidates.length - 1];
        if (parseFloat($("#detail_stakeToken_" + key).val()) < 0) {
            $("#detail_stakeToken_" + key).val("");
        }
        await waitForCompleteLoad();

        if ($("#switch_farm_" + key).hasClass("active")) {
            if (
                parseFloat($("#detail_stakeToken_" + key).val()) >
                stakeTokenBalancesReadable[key]
            ) {
                $("#balance_input_" + key).addClass("redInputStaking");
            } else {
                $("#balance_input_" + key).removeClass("redInputStaking");
            }
        } else {
            if (
                parseFloat($("#detail_stakeToken_" + key).val()) >
                stakedStakeTokenBalancesReadable[key]
            ) {
                $("#balance_input_" + key).addClass("redInputStaking");
            } else {
                $("#balance_input_" + key).removeClass("redInputStaking");
            }
        }
        let usdValue = parseFloat(
            parseFloat($("#detail_stakeToken_" + key).val()) *
                farmData[key].usdValueStakeToken
        ).toFixed(2);

        if (usdValue - parseFloat(usdValue).toFixed(0) == 0) {
            usdValue = parseFloat(usdValue).toFixed(0);
        }
        $("#detail_usd_" + key).val(usdValue);
    });

    $('[id^="detail_usd"]').on("input", async function () {
        let keyCandidates = ("" + this.id).split("_");
        let key = keyCandidates[keyCandidates.length - 1];

        if (parseFloat($("#detail_usd_" + key).val()) < 0) {
            $("#detail_usd_" + key).val("");
        }
        await waitForCompleteLoad();

        let stakeTokenValue = parseFloat(
            parseFloat(
                parseFloat($("#detail_usd_" + key).val()) /
                    farmData[key].usdValueStakeToken
            )
        ).toFixed(2);

        if ($("#switch_farm_" + key).hasClass("active")) {
            if (
                parseFloat(stakeTokenValue) >
                parseFloat(stakeTokenBalancesReadable[key])
            ) {
                $("#balance_input_" + key).addClass("redInputStaking");
            } else {
                $("#balance_input_" + key).removeClass("redInputStaking");
            }
        } else {
            if (
                parseFloat(stakeTokenValue) >
                parseFloat(stakedStakeTokenBalancesReadable[key])
            ) {
                $("#balance_input_" + key).addClass("redInputStaking");
            } else {
                $("#balance_input_" + key).removeClass("redInputStaking");
            }
        }

        if (stakeTokenValue - parseFloat(stakeTokenValue).toFixed(0) == 0) {
            stakeTokenValue = parseFloat(stakeTokenValue).toFixed(0);
        }

        $("#detail_stakeToken_" + key).val(stakeTokenValue);
    });
}
