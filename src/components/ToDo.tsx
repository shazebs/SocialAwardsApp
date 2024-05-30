import axios from 'axios';
import { MouseEvent } from 'react';
import { useState } from 'react';

function ToDo() {
    // functions
    const apiTest = () => {
        axios.get('https://localhost:7148/gas')
             .then(res => {
                console.log('res', res);
             })
             .catch(err => {
                console.log('err', err);
             });
    };
    
    const apiTest2 = () => {
        axios.get('http://127.0.0.1:8000/random/1000')
             .then(response => {
                console.log('response', response.data);
             })
             .catch(error => {
                console.log('error', error);
             });
    };

    // Hook
    const [selectedIndex, setSelectedIndex] = useState(-1); 

    // Event handler
    const handleClick = (event: React.MouseEvent) => console.log(event);

    // variables
    const todo_style = {
        lineHeight: '1.4'
    }    
    const todos = [
        'Purchase a bedroom window screen.',
        'Wash car exterior of Camry.',
        'Purchase clear retainers from Paulson Orthodontics.',
        'Purchase a dentistry teeth cleaning service.',
        'Attend Zarlish\'s wedding ceremony.',
        'Purchase Papa\'s Altima car through settlement.',
        'Purchase repairs on Papa\'s Altima car.',
        'Purchase new tires for Camry.',
        'Purchase a front brakes repair on Camry.',
        'Purchase CFNA debt repayment. ($650)',
        'Purchase MCM debt repayment. ($800)',
        'Purchase Chase bank credit card debt repayment. ($2300)',
        'Purchase Affirm debt repayment. ($3800)',
    ];

    const daily_activities = [
        'Sleep',
        'Brush teeth',
        'Shower | 30 mins',
        'Shave',
        'Weightlifting',
        'Breakfast',
        'Clean',
        'Apply for jobs',
        'Lunch',
        'Poop',
        'Lyft',
        'Dinner',
        'LeetCode',
        'Family Prayer | 30 mins',
        'FaceTime Rooha | 3 hours',
    ];

    const monthly_bills: [string, number][] = [
        ['Chase CC', 84.00],
        ['CFNA', 50.00],
        ['MCM', 100.00],
        ['Azure', 5.50],
        ['Heroku', 8.00],
        ['Hostinger', 10.19],
        ['Planet Fitness', 10.00],
        ['Affirm', 319.00],
        ['SallieMae', 25.00],
        ['Aidvantage', 315.00], 
    ];

    // output
    let total = 0;
    monthly_bills.forEach((bill) => {
        total += bill[1];
    });        

    // markup
    return (
        <>
        <h2>ToDo List:</h2>
        <div style={todo_style}>
        {
            todos.map((element, index) => (
                <div 
                    className = { selectedIndex === index ? 'highlight' : '' }
                    key={index}
                    onClick={() => { setSelectedIndex(index); }}>
                        {index + 1}. {element}
                </div>
            ))
        }
        <button onClick={apiTest}>API test</button>
        <button onClick={apiTest2}>API test 2</button>
        </div>        
        </>
    )
}

export default ToDo;