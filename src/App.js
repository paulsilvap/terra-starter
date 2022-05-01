import './App.css';
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";

import Menu from './components/Menu';
import WalletAddress from './components/WalletAddress';

function App() {

  const { status, connect, disconnect, availableConnectTypes } = useWallet();

  const renderConnectButton = () => {
    if (status === WalletStatus.WALLET_NOT_CONNECTED) {
      return (
        <div className='connect-wallet-div'>
          <button
            type='button'
            key={`connect-EXTENSION`}
            onClick={() => connect('EXTENSION')}
            className='cta-button connect-wallet-button'
          >
            Connect wallet
          </button>
        </div>
      )
    }
    else if (status === WalletStatus.WALLET_CONNECTED) {
      return (
        <button
          type='button'
          onClick={() => disconnect()}
          className='cta-button connect-wallet-button'
        >
          Disconnect
        </button>
      )
    }
  }

  console.log("Wallet status is", status);
  console.log("Available connection types:", availableConnectTypes);

  return (
    <main className="App">
      <header>
        <div className="header-titles">
          <h1>⚔ Dragon Campaign ⚔</h1>
          <p>Only you can save these amazing creatures</p>
        </div>
        <WalletAddress />
      </header>
      
      {status === WalletStatus.WALLET_NOT_CONNECTED && (
        <div>
          <img
            src="https://media.giphy.com/media/1pA8TwX8atOCnAtTbV/giphy.gif"
            alt="Toothless gif"
          />
        </div>
      )}

      {status === WalletStatus.WALLET_CONNECTED && (
        <div className='game-menu-container'>
          <Menu />
        </div>
      )}

      {renderConnectButton()}
    </main>
  );
}

export default App;
