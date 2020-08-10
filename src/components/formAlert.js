import React from 'react';


function  FormAlert({error,handleClose}) {
  return (
    <div >
    <div className="alert alert-warning alert-dismissible fade show" role="alert">
      <span>{error}</span>
</div>

    </div>
  );
}

export default FormAlert;
