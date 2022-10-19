const React = require('react')

class New extends React.Component {
    render(){
        return (
            <>
            <h1>New Log Entry</h1>
            <nav>
                <a href="/logs">Go Back To Home Page</a>
            </nav>
            <br/>
            <form method="POST" action="/logs">
                <label>Title: <input type = "text" name="title" placeholder="Title"></input></label>
                <br/><label>Entry: <br/><textarea name = "entry"></textarea></label>
                <br/><label>Ship is broken: <input type = "checkbox" name="shipIsBroken"></input></label>
                <br/><input type="submit" value="Add Log"></input>
            </form>
            </>
        )
    }
}

module.exports = New