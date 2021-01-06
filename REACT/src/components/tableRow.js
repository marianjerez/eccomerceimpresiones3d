import React from 'react';


class TableRow extends React.Component{

    render(props){
        return(
            <tbody>
                <tr>
                    <td> {this.props.name} </td>
                    <td>${this.props.price} </td>
                    <td>
                        {this.props.categories}
                    </td>
                    <td>
                        {this.props.colors}
                    </td>
                </tr>
            </tbody>
        );
    }
}

export default TableRow