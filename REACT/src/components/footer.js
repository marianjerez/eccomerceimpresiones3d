import React from 'react';

class Footer extends React.Component{

    render(){
        return(
            <footer className="sticky-footer bg-white">
				<div className="container my-auto">
					<div className="copyright text-center my-auto">
						<span>Copyright &copy; Dashboard 2020</span>
					</div>
				</div>
			</footer>
        );
    }
}

export default Footer