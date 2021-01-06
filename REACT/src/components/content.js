import React from 'react';
import Card from './card';
import MiniCard from './miniCard';
import TopBar from './topBar';
import Footer from './footer'
import AllProducts from './allProducts';


class Content extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            materials : [],
            name : "",
            img : "",
            link : ""
        }
    }

    apiCallMaterials(url,handler){
        fetch(url)
			.then((response) => response.json())
			.then((dataMaterials) => handler(dataMaterials))
			.catch((e) => console.log(e));
    }

    apiCallLastProduct(url,handler){
        fetch(url)
			.then((response) => response.json())
			.then((dataLastProduct) => handler(dataLastProduct))
			.catch((e) => console.log(e));
    }

    verMateriales = (dataMaterials) => {
        let arrayMaterials = [];
        for(let i=0; i<dataMaterials.length; i++){
            arrayMaterials.push(dataMaterials[i].tipomaterial)
        }
        
        this.setState(
            {
                materials : arrayMaterials
            }
        )
    }
    
    verLastProduct = (dataLastProduct) => {
        this.setState(
            {
                name : dataLastProduct.descripcion,
                img : `http://localhost:3000${dataLastProduct.imagen}`,
                link : `http://localhost:3000/products/${dataLastProduct.id}`
            }
        )
    }

    componentDidMount(){
        this.apiCallMaterials('http://localhost:3000/api/products/materiales',this.verMateriales);
        this.apiCallLastProduct('http://localhost:3000/api/products/ultimo',this.verLastProduct);
    }

    render(props){
        let mats = this.state.materials;
        let nombre = this.state.name;
        let imagen = this.state.img;
        let link = this.state.link;
        return(
            <div id="content-wrapper" className="d-flex flex-column">
			    <div id="content">
                    <TopBar />
                    <div className="container-fluid">
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
                        </div>
                            <Card/>
                            {/* {contenido.map((item, i) => 
                                item ? 
                                    <Card key={i} titulo = {item.titulo} cifra = {item.cifra} color = {item.color} icono = {item.icono} />
                                     : '' 
                            )}                             */}
                        <div className="row">
                            <div className="col-lg-6 mb-4">
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Last product in Data Dase</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="text-center">
                                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: + '25rem'}} src={imagen} alt="image dummy"/>
                                        </div>
                                        <p> {nombre} </p>
                                        <a target="_blank" rel="nofollow" href={link}>View product detail</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 mb-4">						
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Categories in Data Base</h6>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            {mats.map((item,i) => 
                                                item ? <MiniCard key={i} material = {item} /> : ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <AllProducts/>
                <Footer />
            </div>
        );
    }
}

export default Content