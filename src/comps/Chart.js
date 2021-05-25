import React,{useState} from 'react'
import { Container, Grid } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import TextWrapper from './TextWrapper'
import { Formik, Form } from 'formik'
import * as Yup from 'yup';

function sortOnViews(a,b) //https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
{
    let issue1 = a.viewed;
    let issue2 = b.viewed;

    let comparator = 0;
    if(issue1<issue2)
      comparator =1;
    else
      comparator = -1;

    return comparator;
}

const VerticalBar = () => {
    const issues = useSelector(state=>state.handler.list)
    
    let sortedIssues = [...issues].sort(sortOnViews)
    console.log(sortedIssues);

    const [currentTop, setCurrentTop] = useState(issues.length)
    // console.log(issues.length+" "+currentTop)
    let ids = [],vcount=[]
    for(let i=0;i<currentTop;i++)
    {
      ids.push(sortedIssues[i].id);
      vcount.push(sortedIssues[i].viewed);
    }
    
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
            <Grid container>
              <Grid container direction="row" justify="space-between" alignItems="center" > 

                <Grid item>
                  <h2 style={{fontWeight:'500'}}>Most Viewed Issues</h2>
                </Grid>
                
                <Grid item>
                    <Formik
                      initialValues={{
                        top:''
                      }}
                      validationSchema={Yup.object({
                        top: Yup.number('Please enter a number').max(sortedIssues.length, `There are only ${sortedIssues.length} issues in the system`)
                      })}
                      onSubmit={(values)=>{
                        setCurrentTop(values.top)
                      }}
                      >
                      <Form>
                        <TextWrapper name='top' label='Limit view to top ?' size='small'/>
                      </Form>
                    </Formik>
                </Grid>
              </Grid>
              <Grid container>
                <Bar data={data} height={200} width={600} options={options} />
              </Grid>
            </Grid>
        </Container>
    )
}

export default VerticalBar;