
let currencies = []

class CryptoTracker {
    constructor() {
        this.apiBaseUrl = 'https://api.coingecko.com/api/v3';
        this.comparedCurrencies = new Set();
        this.initializeEventListeners();
        this.loadSavedPreferences();
    }

    getMockCryptoData() {
        return [
            {
                id: 'bitcoin',
                symbol: 'btc',
                name: 'Bitcoin',
                current_price: 50000,
                price_change_percentage_24h: 2.5,
                market_cap: 950000000000,
                total_volume: 25000000000,
                circulating_supply: 19500000,
                max_supply: 21000000,
                all_time_high: 69000,
                rank: 1
            },
            {
                id: 'ethereum',
                symbol: 'eth',
                name: 'Ethereum',
                current_price: 3000,
                price_change_percentage_24h: -1.2,
                market_cap: 350000000000,
                total_volume: 15000000000,
                circulating_supply: 120000000,
                max_supply: null,
                all_time_high: 4800,
                rank: 2
            },
            {
                id: 'binancecoin',
                symbol: 'bnb',
                name: 'Binance Coin',
                current_price: 400,
                price_change_percentage_24h: 1.7,
                market_cap: 60000000000,
                total_volume: 5000000000,
                circulating_supply: 153856150,
                max_supply: 200000000,
                all_time_high: 690,
                rank: 3
            },
            {
                id: 'cardano',
                symbol: 'ada',
                name: 'Cardano',
                current_price: 0.45,
                price_change_percentage_24h: 3.2,
                market_cap: 15000000000,
                total_volume: 1000000000,
                circulating_supply: 34000000000,
                max_supply: 45000000000,
                all_time_high: 3.10,
                rank: 4
            },
            {
                id: 'dogecoin',
                symbol: 'doge',
                name: 'Dogecoin',
                current_price: 0.08,
                price_change_percentage_24h: 4.5,
                market_cap: 11000000000,
                total_volume: 500000000,
                circulating_supply: 132000000000,
                max_supply: null,
                all_time_high: 0.74,
                rank: 5
            },
            {
                id: 'solana',
                symbol: 'sol',
                name: 'Solana',
                current_price: 120,
                price_change_percentage_24h: 2.8,
                market_cap: 50000000000,
                total_volume: 3000000000,
                circulating_supply: 400000000,
                max_supply: null,
                all_time_high: 260,
                rank: 6
            },
            {
                id: 'ripple',
                symbol: 'xrp',
                name: 'XRP',
                current_price: 0.55,
                price_change_percentage_24h: 1.5,
                market_cap: 29000000000,
                total_volume: 2000000000,
                circulating_supply: 53000000000,
                max_supply: 100000000000,
                all_time_high: 3.40,
                rank: 7
            },
            {
                id: 'polkadot',
                symbol: 'dot',
                name: 'Polkadot',
                current_price: 25,
                price_change_percentage_24h: 3.1,
                market_cap: 25000000000,
                total_volume: 1500000000,
                circulating_supply: 987000000,
                max_supply: null,
                all_time_high: 55,
                rank: 8
            },
            {
                id: 'tether',
                symbol: 'usdt',
                name: 'Tether',
                current_price: 1.00,
                price_change_percentage_24h: 0.1,
                market_cap: 80000000000,
                total_volume: 50000000000,
                circulating_supply: 80000000000,
                max_supply: null,
                all_time_high: 1.05,
                rank: 9
            },
            {
                id: 'uniswap',
                symbol: 'uni',
                name: 'Uniswap',
                current_price: 15,
                price_change_percentage_24h: 2.5,
                market_cap: 12000000000,
                total_volume: 500000000,
                circulating_supply: 753000000,
                max_supply: 1000000000,
                all_time_high: 45,
                rank: 10
            },
            {
                id: 'chainlink',
                symbol: 'link',
                name: 'Chainlink',
                current_price: 18,
                price_change_percentage_24h: 1.8,
                market_cap: 9000000000,
                total_volume: 800000000,
                circulating_supply: 500000000,
                max_supply: null,
                all_time_high: 52,
                rank: 11
            },
            {
                id: 'litecoin',
                symbol: 'ltc',
                name: 'Litecoin',
                current_price: 180,
                price_change_percentage_24h: 2.2,
                market_cap: 13000000000,
                total_volume: 1000000000,
                circulating_supply: 72000000,
                max_supply: 84000000,
                all_time_high: 410,
                rank: 12
            },
            {
                id: 'monero',
                symbol: 'xmr',
                name: 'Monero',
                current_price: 250,
                price_change_percentage_24h: 1.5,
                market_cap: 4500000000,
                total_volume: 300000000,
                circulating_supply: 18000000,
                max_supply: null,
                all_time_high: 510,
                rank: 13
            },
            {
                id: 'algorand',
                symbol: 'algo',
                name: 'Algorand',
                current_price: 0.75,
                price_change_percentage_24h: 3.5,
                market_cap: 6000000000,
                total_volume: 400000000,
                circulating_supply: 8000000000,
                max_supply: 10000000000,
                all_time_high: 2.40,
                rank: 14
            },
            {
                id: 'stellar',
                symbol: 'xlm',
                name: 'Stellar',
                current_price: 0.30,
                price_change_percentage_24h: 2.7,
                market_cap: 8000000000,
                total_volume: 500000000,
                circulating_supply: 26000000000,
                max_supply: null,
                all_time_high: 0.87,
                rank: 15
            }
        ];
    }

    async fetchCryptocurrencies() {

        try {
            const myHeaders = new Headers();
            myHeaders.append("accept", "application/json");
            myHeaders.append("x-cg-demo-api-key", atob("Q0ctaXlZWmtEZVR0a2ozNEdtaUQ4b1ZBTXk0"));

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

 

            const localCache = localStorage.getItem("api-cache")
            const cacheObj = JSON.parse(localCache)

            if (localCache === null || (localCache !== null && Date.now() - cacheObj.ts > 30000)) {
                const result = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&ids=bitcoin%2Cethereum%2Csolana%2Cpolkadot%2Cdoge%2Ccardano", requestOptions)
                currencies = await result.json()

                localStorage.setItem("api-cache", JSON.stringify({ "resp": currencies, "ts": Date.now() }))
            } else {
                currencies = cacheObj.resp

            }

            this.renderCurrencyList(currencies);
        } catch (error) {
            console.error('Error fetching cryptocurrencies:', error);
        }
    }

    renderCurrencyList(currencies) {
        const listContainer = document.getElementById('crypto-list');
        listContainer.innerHTML = '';

        currencies.forEach(crypto => {
            const card = document.createElement('div');
            card.classList.add('crypto-card');
            card.innerHTML = `
                <h3>${crypto.name} (${crypto.symbol.toUpperCase()})</h3>
                <p>Price: $${crypto.current_price.toLocaleString()}</p>
                <p class="${crypto.price_change_percentage_24h >= 0 ? 'positive-change' : 'negative-change'}">
                    24h Change: ${crypto.price_change_percentage_24h.toFixed(2)}%
                </p>
                <p>Market Cap: $${(crypto.market_cap / 1_000_000_000).toFixed(2)}B</p>
                <button onclick="cryptoTracker.addToComparison('${crypto.id}')">Compare</button>
            `;
            listContainer.appendChild(card);
        });
    }

    addToComparison(cryptoId) {
        if (this.comparedCurrencies.size >5) {
            alert('Maximum 5 cryptocurrencies can be compared');
            return;
        }

        if (!this.comparedCurrencies.has(cryptoId)) {
            this.comparedCurrencies.add(cryptoId);
            this.updateComparisonSection();
            this.saveComparedCurrencies();
        }
    }

    updateComparisonSection() {
        const comparisonGrid = document.getElementById('comparison-grid');
        comparisonGrid.innerHTML = '';

        this.comparedCurrencies.forEach(cryptoId => {
            const mockCrypto = this.getMockCryptoData().find(c => c.id === cryptoId);
            if (mockCrypto) {
                const card = document.createElement('div');
                card.classList.add('crypto-card');
                card.innerHTML = `
                    <button class="remove-comparison" onclick="cryptoTracker.removeFromComparison('${cryptoId}')">x</button>
                    <h3>${mockCrypto.name} (${mockCrypto.symbol.toUpperCase()})</h3>
                    <p>Price: $${mockCrypto.current_price.toLocaleString()}</p>
                    <p class="${mockCrypto.price_change_percentage_24h >= 0 ? 'positive-change' : 'negative-change'}">
                        24h Change: ${mockCrypto.price_change_percentage_24h.toFixed(2)}%
                    </p>
                    <p>Market Cap: $${(mockCrypto.market_cap / 1_000_000_000).toFixed(2)}B</p>
                `;
                comparisonGrid.appendChild(card);
            }
        });
    }

    removeFromComparison(cryptoId) {
        this.comparedCurrencies.delete(cryptoId);
        this.updateComparisonSection();
        this.saveComparedCurrencies();
    }

    initializeEventListeners() {
        document.getElementById('sort-select').addEventListener('change', this.handleSorting.bind(this));
        document.getElementById('favorites-checkbox').addEventListener('change',this.handleFavoritesFilter.bind(this));
    }

    handleSorting(event) {
        // Implement sorting logic
        console.log('Sorting by:', event.target.value);
        const sortBy = event.target.value;
        // const currencies = this.getMockCryptoData();

        // Sort based on the selected criteria
        switch (sortBy) {
            case 'price-asc':
                currencies.sort((a, b) => a.current_price - b.current_price); // Sort by price ascending
                
                break;
            case 'price-desc':
                currencies.sort((a, b) => b.current_price - a.current_price); // Sort by price descending
                break;
            case 'market-cap':
                currencies.sort((a, b) => b.market_cap - a.market_cap); // Sort by market cap descending
                break;
            case '24h-change':
                currencies.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h); // Sort by 24h change descending
                break;
            default:
                break;
        }

        // Re-render the currency list after sorting
        this.renderCurrencyList(currencies);
    }

    handleFavoritesFilter(event) {
        // When the checkbox is toggled, re-render the currency list
        console.log('Show favorites:', event.target.checked);
        this.renderCurrencyList(currencies); // Re-render to apply the filter
    }

    saveComparedCurrencies() {
        localStorage.setItem('comparedCurrencies', JSON.stringify([...this.comparedCurrencies]));
    }

    saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify([...this.favorites]));
    }

    loadSavedPreferences() {
        const savedCurrencies = JSON.parse(localStorage.getItem('comparedCurrencies') || '[]');
        savedCurrencies.forEach(cryptoId => this.comparedCurrencies.add(cryptoId));

        const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        savedFavorites.forEach(cryptoId => this.favorites.add(cryptoId));

        if (this.comparedCurrencies.size > 0) {
            this.updateComparisonSection();
        }
    }

    saveComparedCurrencies() {
        localStorage.setItem('comparedCurrencies', JSON.stringify([...this.comparedCurrencies]));
    }

    loadSavedPreferences() {
        const savedCurrencies = JSON.parse(localStorage.getItem('comparedCurrencies') || '[]');
        savedCurrencies.forEach(cryptoId => this.comparedCurrencies.add(cryptoId));

        if (this.comparedCurrencies.size > 0) {
            this.updateComparisonSection();
        }
        this.renderCurrencyList(currencies);
    }
    
}

const cryptoTracker = new CryptoTracker();
window.cryptoTracker = cryptoTracker;

// Initial data fetch
cryptoTracker.fetchCryptocurrencies();

// Periodic refresh (every minute)
setInterval(() => {
    cryptoTracker.fetchCryptocurrencies();
    document.getElementById('last-updated').textContent = new Date().toLocaleString();
}, 60000);
