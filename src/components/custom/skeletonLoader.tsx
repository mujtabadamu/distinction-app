import React from 'react';
import { Grid, Spacer } from '@flexisaf/flexibull2';
import Skeleton from 'react-loading-skeleton';

const SkeletonLoader = () => {
  return (
    <>
      <Grid default="1fr">
        <Skeleton
          baseColor="#d0d5d933"
          highlightColor="#c2cad133"
          width="100%"
          height="8rem"
        />
      </Grid>
      <Spacer space={24} />
      <Grid default="1fr">
        <Skeleton
          baseColor="#d0d5d933"
          highlightColor="#c2cad133"
          width="100%"
          height="20rem"
        />
      </Grid>
      <Spacer space={24} />
      <Grid default="1fr">
        <Skeleton
          count={1}
          baseColor="#d0d5d933"
          highlightColor="#c2cad133"
          width="100%"
          height="20rem"
        />
      </Grid>
    </>
  );
};

export default SkeletonLoader;
