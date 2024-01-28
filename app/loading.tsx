
import * as React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

const Loading = () => {
  return (
    <div className={" flex items-center justify-center h-auto p-10"}>
      <div className=' h-auto py-10'>
        <img src="/logofav.png" alt="" className='bg-cover  w-[400px] h-[400px] bg-center bg-no-repeat self-center  '/>
          <div className={"self-center w-[400px] relative top-[-80px]"}>
              <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                  <LinearProgress color="secondary" />
                  <LinearProgress color="success" />
                  <LinearProgress color="inherit" />
              </Stack>
          </div>

      </div>
    </div>
  )
}

export default Loading