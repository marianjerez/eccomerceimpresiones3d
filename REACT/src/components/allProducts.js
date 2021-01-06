import React from 'react';
import './styles/allProducts.css';
import TableRow from './tableRow';


class AllProducts extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            products : []
        }
    }

    apiCallProduct(url,handler){
        fetch(url)
			.then((response) => response.json())
			.then((dataProduct) => handler(dataProduct))
			.catch((e) => console.log(e));
    }

    verProduct = (dataProduct) => {
        let arrayProduct = [];
        for(let i=0; i<dataProduct.data.length; i++){
            arrayProduct.push(dataProduct.data[i])
        }
        this.setState(
            {
                products : arrayProduct
            }
        )
    }

    componentDidMount(){
        this.apiCallProduct('http://localhost:3000/api/products',this.verProduct);
    }

    render(props){
        let prods = this.state.products;
        return(
        <div>
            <h1 className="h3 mb-2 text-gray-800">All the products in the Database</h1>    
			<div className="card shadow mb-4">
				<div className="card-body">
					<div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Colored</th>
                                    
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Colored</th>
                                    
                                </tr>
                            </tfoot>
                            {prods.map( (item,i) => 
                                item ? <TableRow key={i} 
                                    name={item.descripcion} 
                                    price={item.precio} 
                                    categories={item.materials.tipomaterial} 
                                    colors={item.pintado}
                                    /> : ''
                            )}              
                        </table>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default AllProducts