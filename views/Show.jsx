const React = require('react');

class Show extends React.Component {
   
    render(){
        const {title, entry, shipIsBroken, _id} = this.props.log;
        return(
        <>
            <h1> {title} </h1>
            <nav>
                <a href="/logs">Back To Logs Home</a><br/>
                <a href={`/logs/${_id}/edit`}>{`Edit ${title}`}</a>
            </nav>
            <p>{entry} {shipIsBroken ? 'and Ship is broken':''}</p>
        </>
        )
   } 
}

module.exports = Show