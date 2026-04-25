import { Joystick } from "react-joystick-component";

function JoyInput({onChange}) 
{
    const cardStyle = {
        backgroundColor: '#1e1e1e',
        padding: '20px 30px',
        borderRadius: '15px',
        boxShadow: '0 0px 0px rgba(26, 35, 192, 0.74)',
        minWidth: '250px'
    };

    const LeftHandler = (e) => {
        onChange((prev) =>({
            ...prev,
            lx : e.y,
            ly : e.x
        }))
    };

    const LeftStop = ()=>{
        onChange((prev) =>({
            ...prev,
            lx : 0.0,
            ly : 0.0
        }))
    }

    const RightHandler = (e) => {
        onChange((prev) =>({
            ...prev,
            rx : -e.x
        }))
    }

    const RightStop = ()=>{
        onChange((prev) =>({
            ...prev,
            rx : 0.0
        }))
    }

    return (
        <div style={cardStyle}>
            <div style={{display: "flex", gap: "180px" }}>
                {/* 左スティック */}
                <Joystick
                    size={120}
                    baseColor="gray"
                    stickColor="lightblue"
                    move={LeftHandler}
                    stop={LeftStop}
                    
                />

                {/* 右スティック */}
                <Joystick
                    size={120}
                    baseColor="gray"
                    stickColor="lightblue"
                    move={RightHandler}
                    stop={RightStop}
                />
            </div>
        </div>
    );
}

export default JoyInput;