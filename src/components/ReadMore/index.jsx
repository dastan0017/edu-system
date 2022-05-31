import { useState } from 'react'
import PropTypes from 'prop-types'

export const ReadMore = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      {isOpen ? (
        text.split('\n').map((el, idx) => (
          <div key={idx}>
            {idx === 0 ? (
              <div style={{ marginBottom: '10px' }}>
                <p style={{ marginBottom: 0 }}>{text?.split('\n')[0]}</p>
              </div>
            ) : (
              <p>{el}</p>
            )}
          </div>
        ))
      ) : (
        <>
          <p style={{ marginBottom: 0 }}>{text.split('\n')[0]}</p>
          <p style={{ marginTop: '10px' }}>
            {text.split('\n')[1]?.substring(0, 200)}
            {text.length > 200 && '...'}
          </p>
        </>
      )}

      {text.length > 200 && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            color: '#5243C2',
            background: 'white',
            border: 'none',
            padding: '0',
            fontSize: '12px',
            fontWeight: '600',
            marginTop: '1rem',
          }}
        >
          {isOpen ? 'Скрыть' : 'Читать далее'}
        </button>
      )}
    </div>
  )
}
ReadMore.propTypes = {
  text: PropTypes.string,
}
