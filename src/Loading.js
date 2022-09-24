import React, { Component } from 'react'

export default class Loading extends Component {
  render() {
    return (
      <div className='d-flex justify-content-center align-items-center border rounded p-3'>
        <div className="spinner-border text-warning" style={{width: '3rem', height: '3rem'}}>
            <span className='visually-hidden'>
                Carregando...
            </span>  
        </div>
        <p className="text-primary">{this.props.mensagem}</p>
      </div>
    )
  }
}
//fora da classe que define o coponente
Loading.defaultProps = {    
    mensagem: "Carregando"
}