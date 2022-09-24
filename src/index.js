import 'bootstrap/dist/css/bootstrap.css'
import ReactDOM from 'react-dom'
import React from 'react'
import '@fortawesome/fontawesome-free/css/all.css'
import EstacaoClimatica from './EstacaoClimatica'
import Loading from './Loading'

//(Reescrevendo  o  componente   funcional   utilizando   uma  classe)
//A classe que o define deverá herdar de React.Component
class App extends React.Component{
    constructor(props){
    super(props)
//   this.state = {
//     latitude: null,
//     longitude: null,
//     estacao: null,
//     data: null,
//     icone: null,
//     mensagemDeErro: null
//   }
    console.log('construtor')
// }

//State = Só pode fazer uma vez, dentro ou fora do construtor

}

state = {
    latitude: null,
    longitude: null,
    estacao: null,
    data: null,
    icone: null,
    mensagemDeErro: null
}

    //considerando que localizações com valor de latitude menor do que zero estão no hemisfério Sul. 
    //As demais estão no hemisfério Norte.
    obterEstacao = (data, latitude) => {
        const ano = data.getFullYear();
        const d1 = new Date(ano , 5, 21)
        const d2 = new Date (ano, 8, 22)
        const d3 = new Date (ano, 11, 21)
        const d4 = new Date (ano, 3, 20)
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
        "Primavera": "fa-seedling",
        "Verão": "fa-umbrella-beach",
        "Outono": "fa-tree",
        "Inverno": "fa-snowman"  
    }

    obterLocalizacao = () => {
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
            },
            (err) => {
                console.log(err)
                this.setState({mensagemDeErro: "Tente novamente mais tarde"})
            }

        )//opera de maneira assincrona.
    }
    
    //Para cada component react é vdd que o componentDidMount e o componentWillUnmount executa uma vez apenas.
    componentDidMount(){
        console.log('componentDidMount')
        this.obterLocalizacao()
    }    
    
    componentDidUpdate (){
        console.log('componentDidUpdate')
    }

    componentWillUnmount (){
        console.log('componentWillUnmount')    
    }

    //Definirá um método chamado render. Ele é responsável por produzir a expressãoJSX de interesse
    render(){
        console.log("render")
        return (
            <div className='container mt-2'>
                <div className="row justify-content-center">
                    <div className="col-md-8 p-3">
                        {
                            (!this.state.mensagemDeErro && !this.state.latitude)
                            ?
                            <Loading mensagem="Por favor, responda à solicitação de localização"/>
                            :
                        this.state.mensagemDeErro ?
                            <p className="border rounded p-2 fs-1">
                                É preciso dar permissão para acesso à localização
                            </p>
                        :
                        <EstacaoClimatica 
                            icone={this.state.icone}
                            estacao={this.state.estacao}
                            latitude={this.state.latitude}
                            longitude={this.state.longitude}
                            //data={this.state.data}
                            //mensagemDeErro={this.state.mensagemDeErro}
                            obterLocalizacao={this.obterLocalizacao}
                        /> 
                        }

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