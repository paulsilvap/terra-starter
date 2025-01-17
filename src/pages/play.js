import React, {useState, useEffect} from "react";
import * as execute from '../contract/execute'
import { useConnectedWallet } from "@terra-money/wallet-provider";
import LoadingIndicator from '../components/LoadingIndicator';

const Play = () => {
    const connectedWallet = useConnectedWallet();
    const playTime = 15;

    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(playTime);
    const [targetPosition, setTargetPosition] = useState({top: "15%", left: "50%"});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = setInterval(() => {
            setTime(time => time > 0 ? time - 1 : 0);
        }, 1000);
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (time === 0) {
            setTargetPosition({ display: 'none'});
            alert(`Game over! Your score is ${score}. Please confirm transaction to submit score.`);
            submitScore();
        }
    }, [time]);

    const submitScore = async () => {
        if (connectedWallet && connectedWallet.network.name === 'testnet') {
            setLoading(true);
            const tx = await execute.setScore(connectedWallet, score);
            console.log(tx);
            alert('Score submitted!');
            setLoading(false);
            window.location.href = '/leaderboard';
        }
    }

    const handleClick = () => {
        let audio = new Audio("/Zergling_explodes.mp3");

        audio.volume = 0.2;
        audio.play();

        setScore(score => score + 1);

        setTargetPosition({
            top: `${Math.floor(Math.random() * 80)}%`,
            left: `${Math.floor(Math.random() * 80)}%`
        });
    };

    return (
        <div className="score-board-container">
            <div className="play-container">
                <span> Score: {score}</span>
                <span> Catch! </span>
                <span> Time left: {time} s</span>
            </div>

            {loading ? (
                <LoadingIndicator />
            ) : (
                <div className="game-container">
                    <img src={"dragon.png"} id="target" alt="Target" style={{ ...targetPosition }} onClick={handleClick} />
                    <img src="hiccup.png" id="marine-img" alt="Marine"/>
                </div>
            )}
            {/* <button className="cta-button connect-wallet-button" onClick={
            () => setScore(score => score + 1)}>+1 score</button>

            <button className="cta-button connect-wallet-button" onClick={submitScore}>Submit score</button> */}
        </div>
    )
}

export default Play;