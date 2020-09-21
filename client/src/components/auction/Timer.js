import React, {useEffect, useState} from "react";

const Timer = ({time}) => {
    const [secondsLeft, setSecondsLeft] = useState(Math.floor((new Date(time).getTime() - Date.now()) / 1000))

    useEffect(() => {
        const timer = setInterval(() => {
            if (secondsLeft <= 0) {
                setSecondsLeft(0)
                clearInterval(timer);
            } else {
                setSecondsLeft(secondsLeft - 1);
            }
        }, 1000)
        return () => clearInterval(timer)
    })

    const days = Math.floor(secondsLeft / 24 / 60 / 60);
    const hoursLeft = Math.floor((secondsLeft) - (days * 86400));
    const hours = Math.floor(hoursLeft / 3600);
    const minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
    const minutes = Math.floor(minutesLeft / 60);
    const seconds = secondsLeft % 60;

    return (
        <div>
            <span>{days}d. {hours}h. {minutes}min. {seconds}sec.</span>
        </div>
    )
}

export default Timer