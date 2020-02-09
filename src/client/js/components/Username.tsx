import * as React from "react";

interface Props {
    setUsername: any;
    username: string;
}

export default function Username(props: Props) {
    const [username, setUsername] = React.useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        props.setUsername(username)
        event.preventDefault();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" value={username} onChange={event => setUsername(event.target.value)}/>
                <input type="submit" value="Submit" />
            </form>
        </div>
        
    )
}