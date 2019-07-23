import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const FormTitle = React.memo(({children}) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box width={40} height={40} borderRadius="50%" bgcolor="secondary.main">
        <Box m={1} color="secondary.contrastText">
          <LockOutlinedIcon />
        </Box>
      </Box>
      <Box fontSize="h5.fontSize" mt={1} mb={2}>
        {children}
      </Box>
    </Box>
  )
})

FormTitle.propTypes = {
  children: PropTypes.node.isRequired
}
export default FormTitle;

