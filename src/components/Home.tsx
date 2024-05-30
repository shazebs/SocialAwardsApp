function Home() {
    // variables 
    const app_name = 'Social Awards';
    const app_title_style = {
        color: 'dodgerblue'
    };
    const categories = [
        'Best Dressed (Gen X) Male',
        'Best Dressed (Gen X) Female',
        'Best Dressed (Millenial) Male',
        'Best Dressed (Millenial) Female',
        'Best Dressed (Gen Z) Male',
        'Best Dressed (Gen Z) Female',
    ];

    // functions
    // ...

    // markup 
    return (
        <>
        <h1>Welcome to the <span style={app_title_style}>{app_name}</span> app!</h1>
        <h2>Award Categories:</h2>
        {
            categories.map((e) => (
                <div key={e}>{e}</div>
            ))
        }
        </>
    );
}

export default Home;