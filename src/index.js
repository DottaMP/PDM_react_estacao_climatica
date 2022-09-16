import 'bootstrap/dist/css/bootstrap.css'
import ReactDOM from 'react-dom'
import React from 'react'
import '@fortawesome/fontawesome-free/css/all.css'

//(Reescrevendo  o  componente   funcional   utilizando   uma  classe)
//A classe que o define deverá herdar de React.Component
class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        latitude: null,
        longitude: null,
        estacao: null,
        data: null,
        icone: null
        }
    }

    //considerando que localizações com valor de latitude menor do que zero estão no hemisfério Sul. 
    //As demais estão no hemisfério Norte.
    obterEstacao = (data, latitude) => {
        const ano = data.getFullYear();
        const d1 = new Date(ano , 5, 21)
        const d2 = new Date (ano, 8, 24)
        const d3 = new Date (ano, 11, 22)
        const d4 = new Date (ano, 3, 21)
        const sul = latitude < 0
        if (data >= d1 && data < d2){
            return sul ? 'Inverno' : 'Verão'
        }
        if (data >= d2 && data < d3){
            return sul ? 'Primavera' : 'Outono'
        }

        if (data >= d3 && data < d4){
            return sul ? 'Verão' : 'Inverno'
        }
            return sul ? 'Outono' : 'Primavera'
    }

    //Um objeto JSON que faz o mapeamento entre ícones e estações climáticas
    icones = {
        "Primavera" : "fa-seedling",
        "Verão": "fa-umbrella-beach",
        "Outono": "fa-tree",
        "Inverno": "fa-snowman"  
    }
    
    //Definirá um método chamado render. Ele é responsável por produzir a expressãoJSX de interesse
    render(){
        return (
        <div>
            Meu App
        </div> 
        )
    }
}

ReactDOM.render(
<App/>,
document.querySelector('#root')
)