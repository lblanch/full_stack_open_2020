import React, { useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const Togglable = React.forwardRef((props, ref) => {
    const [isVisible, setIsVisible] = useState(false)

    const hiddenStyle = { display: isVisible ? 'none' : '' }
    const visibleStyle = { display: isVisible ? '' : 'none' }

    const toggleVisibility = () => setIsVisible(!isVisible)

    const cancelButton = <Button variant="outlined" color="secondary" onClick={toggleVisibility}>{props.hideLabel}</Button>

    useImperativeHandle(ref, () => {
        return { toggleVisibility }
    })

    //The cancel button to close the element will be passed as a prop to the child, so it can be positioned easily.
    //IMPORTANT: only one child is allowed!
    const newChild = React.cloneElement(React.Children.only(props.children), { cancelButton: cancelButton })

    return (
        <div>
            <div style={hiddenStyle}>
                <Button variant="contained" color="secondary" onClick={toggleVisibility}>{props.showLabel}</Button>
            </div>
            <div style={visibleStyle}>
                {newChild}
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