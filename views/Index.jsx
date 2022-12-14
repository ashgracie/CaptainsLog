const React = require('react');
class Index extends React.Component{
    render(){
        const {logs} = this.props
        return(
            <div>
                <h1>Logs Index Page</h1>
                <nav>
                    <a href="/logs/new">Create a New Log</a>
                </nav>
                <ul>
                    {
                        
                        logs.map((log) => {
                            const {title, entry, shipIsBroken} = log
                            return (
                                <li key={log._id}>
                                    <a href={`/logs/${log._id}`}>
                                    {title}</a> {entry}
                                    
                                     <br/>
                                    {
                                        shipIsBroken? 
                                        'It\'s broken':
                                        ''
                                    }
                                    <br/>
                                    <form method="POST" action={`/logs/${log._id}?_method=DELETE`}>
                                        <input type="submit" value={`Delete ${title}`}/>
                                    </form>
                                </li>
                            )
                        })
                        
                    }
                </ul>
            </div>
        )
    }
}

module.exports = Index