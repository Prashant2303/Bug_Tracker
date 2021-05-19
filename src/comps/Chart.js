import React from 'react'
import { Container, Grid } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const VerticalBar = () => {
    const issues = useSelector(state=>state.handler.list)
    
    let ids = [],vcount=[]
    issues.forEach(issue=>{
        ids.push(issue.id);
        vcount.push(issue.viewed);
    })
    // console.log(ids);
    // console.log(vcount);
    
    const data = {

      labels: ids,
      datasets: [
        {
          label: 'Most viewed Issues',
          data: vcount,
          backgroundColor: 'rgba(54, 162, 235, 0.4)',
            // 'rgba(255, 99, 132, 0.2)',
            // 'rgba(255, 206, 86, 0.2)',
            // 'rgba(75, 192, 192, 0.2)',
            // 'rgba(153, 102, 255, 0.2)',
            // 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
    
    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    return(
        <Container>
            <Grid container xs={12}>
                <div className='header'>
                <h1 className='title'>Vertical Bar Chart</h1>
                
                </div>
                <Bar data={data} height={200} width={600} options={options} />
            </Grid>
        </Container>
    )
}

export default VerticalBar;