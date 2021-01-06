import React from 'react';

class MiniCard extends React.Component{

    render(props){
        return(
            <div className="col-lg-6 mb-4">
                <div className="card bg-info text-white shadow">
                    <div className="card-body">
                    { this.props.material }
                    </div>                           
                </div>
            </div>
        );
    }
}

export default MiniCard