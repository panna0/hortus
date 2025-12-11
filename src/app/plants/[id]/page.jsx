

const Plant = async ({ params }) => { 

    const { id } = await params;

  
    return (
      <>
        <h1>plant {id}</h1>
      </>
    );
  }
  
  export default Plant;