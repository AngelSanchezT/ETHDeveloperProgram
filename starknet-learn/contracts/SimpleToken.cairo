# Declarar la interfaz del token
interface Token {
    def transfer(to: address, amount: felt) -> ()
}

# Definir el contrato inteligente
contract SimpleToken {
    # Almacenar el saldo de cada usuario
    balances: (address, felt)

    # Evento para registrar cada transferencia
    event Transfer(sender: address, recipient: address, amount: felt)

    # Función para transferir tokens entre usuarios
    public fn transfer(to: address, amount: felt) -> () {
        # Verificar que el remitente tenga suficientes tokens para la transferencia
        assert(balances[msg.sender] >= amount)

        # Actualizar los saldos de remitente y destinatario
        balances[msg.sender] -= amount
        balances[to] += amount

        # Emitir el evento de transferencia
        emit Transfer(msg.sender, to, amount)

        # Llamar al método transfer() de la interfaz del token
        Token.transfer(to, amount)
    }
}
