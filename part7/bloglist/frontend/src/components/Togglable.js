import React, { useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const Togglable = React.forwardRef((props, ref) => {
    const [isVisible, setIsVisible] = useState(false)

    const hiddenStyle = { display: isVisible ? 'none' : '' }
    const visibleStyle = { display: isVisible ? '' : 'none' }

    const toggleVisibility = () => setIsVisible(!isVisible)

    useImperativeHandle(ref, () => {
        return { toggleVisibility }
    })

    return (
        <div>
            <div style={hiddenStyle}>
                <Button variant="contained" color="secondary" onClick={toggleVisibility}>{props.showLabel}</Button>
            </div>
            <div style={visibleStyle}>
                <Button variant="outlined" color="secondary" onClick={toggleVisibility}>{props.hideLabel}</Button>
                {props.children}
            </div>
        </div>
    )
})

Togglable.propTypes = {
    showLabel: PropTypes.string.isRequired,
    hideLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable