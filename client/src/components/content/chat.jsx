import React from 'react'
import { GptIcon } from '../../assets'
import './style.scss'

const Chat = () => {
  return (
    <div className='Chat'>
      <div className='qs'>
        <div className='acc'>
          A
        </div>
        <div className='txt'>
          Explain quantum computing in simple terms
        </div>
      </div>

      <div className="res">
        <div className='icon'>
          <GptIcon />
        </div>
        <div className='txt' dangerouslySetInnerHTML={{__html: `Quantum computing is a type of computing that uses quantum bits, or "qubits," to perform calculations. Unlike classical bits which can only exist in one of two states (0 or 1), qubits can exist in multiple states at the same time, known as a superposition.

This allows quantum computers to perform certain types of calculations much faster than classical computers. Additionally, qubits can be entangled, meaning that the state of one qubit is dependent on the state of another, even if they are separated by a large distance.

This property of entanglement enables quantum computers to perform certain tasks that are impossible for classical computers to do efficiently.

Overall, quantum computing has the potential to revolutionize fields such as cryptography, drug discovery, and artificial intelligence, among others.

Quantum computing is a type of computing that uses quantum bits, or "qubits," to perform calculations. Unlike classical bits which can only exist in one of two states (0 or 1), qubits can exist in multiple states at the same time, known as a superposition.

This allows quantum computers to perform certain types of calculations much faster than classical computers. Additionally, qubits can be entangled, meaning that the state of one qubit is dependent on the state of another, even if they are separated by a large distance.

This property of entanglement enables quantum computers to perform certain tasks that are impossible for classical computers to do efficiently.

Overall, quantum computing has the potential to revolutionize fields such as cryptography, drug discovery, and artificial intelligence, among others.
Quantum computing is a type of computing that uses quantum bits, or "qubits," to perform calculations. Unlike classical bits which can only exist in one of two states (0 or 1), qubits can exist in multiple states at the same time, known as a superposition.

This allows quantum computers to perform certain types of calculations much faster than classical computers. Additionally, qubits can be entangled, meaning that the state of one qubit is dependent on the state of another, even if they are separated by a large distance.

This property of entanglement enables quantum computers to perform certain tasks that are impossible for classical computers to do efficiently.

Overall, quantum computing has the potential to revolutionize fields such as cryptography, drug discovery, and artificial intelligence, among others.Quantum computing is a type of computing that uses quantum bits, or "qubits," to perform calculations. Unlike classical bits which can only exist in one of two states (0 or 1), qubits can exist in multiple states at the same time, known as a superposition.

This allows quantum computers to perform certain types of calculations much faster than classical computers. Additionally, qubits can be entangled, meaning that the state of one qubit is dependent on the state of another, even if they are separated by a large distance.

This property of entanglement enables quantum computers to perform certain tasks that are impossible for classical computers to do efficiently.

Overall, quantum computing has the potential to revolutionize fields such as cryptography, drug discovery, and artificial intelligence, among others.Quantum computing is a type of computing that uses quantum bits, or "qubits," to perform calculations. Unlike classical bits which can only exist in one of two states (0 or 1), qubits can exist in multiple states at the same time, known as a superposition.

This allows quantum computers to perform certain types of calculations much faster than classical computers. Additionally, qubits can be entangled, meaning that the state of one qubit is dependent on the state of another, even if they are separated by a large distance.

This property of entanglement enables quantum computers to perform certain tasks that are impossible for classical computers to do efficiently.

Overall, quantum computing has the potential to revolutionize fields such as cryptography, drug discovery, and artificial intelligence, among others.`}} />
      </div>
    </div>
  )
}

export default Chat