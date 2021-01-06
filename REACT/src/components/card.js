import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			amount : "",
			products : "",
			quantity : "",
			cartNumber : "",
			cartAmount : ""
		}
	}

	apiCallProducts(url, handler){
		fetch(url)
			.then((response) => response.json())
			.then((dataProducts) => handler(dataProducts))
			.catch((e) => console.log(e));
	}

	apiCallUsers(url,handler){
		fetch(url)
			.then((response) => response.json())
			.then((dataUsers) => handler(dataUsers))
			.catch((e) => console.log(e));
	}

	apiCallCarts(url,handler){
		fetch(url)
			.then((response) => response.json())
			.then((dataCarts) => handler(dataCarts))
			.catch((e) => console.log(e));
	}

	// como va a usar setState necesita ser definido como una arrow function que va a recibir data
	verProductos = (dataProducts) => {
		let monto = 0;
		for(let i=0; i<dataProducts.data.length; i++){
			monto += dataProducts.data[i].precio
		}

		this.setState(
			{
			products : dataProducts.data.length,
			amount : monto
			}
		)
	}

	verUsuarios = (dataUsers) => {
		this.setState(
			{
				quantity : dataUsers.data.length
			}
		)
	}

	verCarts = (dataCarts) => {
		console.log(dataCarts);
		this.setState(
			{
				cartNumber : dataCarts.data.length,
				cartAmount : dataCarts.data.length
			}
		)
	}

	componentDidMount(){
		this.apiCallProducts('http://localhost:3000/api/products',this.verProductos);
		this.apiCallUsers('http://localhost:3000/api/users',this.verUsuarios);
		this.apiCallCarts('http://localhost:3000/api/chart',this.verCarts);
	}

    render(props){
		let monto;
		let productos;
		let cantidad;

		this.state.amount == "" ? monto = 'Cargando...' : monto = this.state.amount;
		this.state.products == "" ? productos = 'Cargando...' : productos = this.state.products;
		this.state.quantity == "" ? cantidad = 'Cargando...' : cantidad = this.state.quantity;

        return(
            <div className="row">
				<div className="col-md-4 mb-4">
					<div className="card border-left-primary shadow h-100 py-2">
						<div className="card-body">
							<div className="row no-gutters align-items-center">
								<div className="col mr-2">
									<div className="text-xs font-weight-bold text-primary text-uppercase mb-1"> Products in Data Base</div>
									<div className="h5 mb-0 font-weight-bold text-gray-800"> {productos} </div>
								</div>
								<div className="col-auto">
									<i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="col-md-4 mb-4">
					<div className="card border-left-success shadow h-100 py-2">
						<div className="card-body">
							<div className="row no-gutters align-items-center">
								<div className="col mr-2">
									<div className="text-xs font-weight-bold text-success text-uppercase mb-1"> Amount in products</div>
									<div className="h5 mb-0 font-weight-bold text-gray-800">$ {monto} </div>
								</div>
								<div className="col-auto">
									<i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="col-md-4 mb-4">
					<div className="card border-left-warning shadow h-100 py-2">
						<div className="card-body">
							<div className="row no-gutters align-items-center">
								<div className="col mr-2">
									<div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Users quantity
									</div>
									<div className="h5 mb-0 font-weight-bold text-gray-800"> {cantidad} </div>
								</div>
								<div className="col-auto">
									<i className="fas fa-user-check fa-2x text-gray-300"></i>
								</div>
							</div>
						</div>
					</div>
				</div>

		</div>
        );
    }
}

// Card.propTypes = {
// 	titulo : PropTypes.string.isRequired,
// 	color : PropTypes.string.isRequired,
// 	cifra : PropTypes.oneOfType([
// 		PropTypes.string,
// 		PropTypes.number
// 	]).isRequired,
// 	icono : PropTypes.oneOf([
// 	<i className="fas fa-clipboard-list fa-2x text-gray-300"></i>,
// 	<i className="fas fa-dollar-sign fa-2x text-gray-300"></i>,
// 	<i className="fas fa-user-check fa-2x text-gray-300"></i>
// 	]).isRequired
// }

// Card.defaultProps = {
// 	titulo : "No Data",
// 	color : "blue",
// 	cifra : "-",
// 	icono : <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
// }

export default Card