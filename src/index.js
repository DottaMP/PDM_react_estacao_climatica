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

    obterLocalizacao(){
        //função que faz com que apareça o push para o usuário autorizar a localização
        window.navigator.geolocation.getCurrentPosition(
            //arrow function para obter a localização do usuario
            (position) => {
                let data = new Date()//obtem a data atual do sistema
                let estacao = this.obterEstacao(data, position.coords.latitude)
                let icone = this.icones[estacao]
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    data: data.toLocaleString(),//faz a conversao da data para aparecer data e hora
                    estacao: estacao,
                    icone: icone
                })
            }
        )
        //opera de maneira assincrona.
    }
    
    //Definirá um método chamado render. Ele é responsável por produzir a expressãoJSX de interesse
    render(){
        return (
            <div className='container mt-2'>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center border rounded mb-2" style={{height: '6rem'}}>
                                    <i className={`fas fa-5x ${this.state.icone}`}></i>
                                    <p className="w-75 ms-3 text-center fs-1">
                                        {`${this.state.estacao}`}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-center">
                                        {
                                            this.state.latitude ?
                                                `Coordenadas: ${this.state.latitude}, ${this.state.longitude}, Data: ${this.state.data}.`
                                            :
                                                `Clique no botão para saber sua estação climática`
                                        } 
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
<App/>,
document.querySelector('#root')
)