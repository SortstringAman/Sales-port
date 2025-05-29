import { useEffect, useState } from 'react';
import '../../assets/css/StudentFullProfile.css'
import previous from '../../assets/icons/purpprev.svg';
import tablelast from '../../assets/icons/tablelast.svg';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ApexCharts from 'react-apexcharts';
import arrowup from '../../assets/icons/arrowup.svg';
import { useNavigate } from 'react-router-dom';



import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import CollapsibleTable from '../../Component/CollapsableTable';
import { GenerateIDModal } from '../../Component/Modals/GenerateIDModal';
import { IDValidityModal } from '../../Component/Modals/IDValidityModal';
import { IDPreviewModal } from '../../Component/Modals/IDPreviewModal';

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

export const StudentFullProfile = () => {
    const navigate = useNavigate();
    const colors = ["#D4C1FF", "#B79AF6", "#7F56DA", "#5225B8"];
    const [isTableVisible, setIsTableVisible] = useState(null);
    const [isArrowUp, setIsArrowUp] = useState(true);
    const [idmodal,setidmodal]= useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentmodal,setpaymentmodal]=useState(false);
    const [cardpreview,setcardpreview]=useState(false);
    const toggleTableVisibility = (section) => {
        setIsTableVisible(isTableVisible === section ? null : section);
        setIsArrowUp(!isArrowUp);
    };
    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
    const radialData = [
        { label: "Anatomy", percentage: 65 },
        { label: "Physiology", percentage: 70 },
        { label: "Biochemistry", percentage: 55 },
        { label: "Care", percentage: 80 }
    ];
    const donutData = {
        labels: ['Anatomy', 'Physiology', 'Biochemistry', 'Care'],
        datasets: [
            {
                data: [32, 38, 30, 70], // Percentages for each subject
                backgroundColor: ['#FF7F50', '#40E0D0', '#FFD700', '#8A2BE2'], // Colors
                borderWidth: 1,
            },
        ],
    };
    const donutData2 = {
        labels: ['Anatomy', 'Physiology', 'Biochemistry', 'Care'],
        datasets: [
            {
                data: [32, 38, 30, 70], // Percentages for each subject
                backgroundColor: ['#D4C1FF', '#B79AF6', '#7F56DA', '#5225B8'], // Colors
                borderWidth: 1,
            },
        ],
    };
    const BarData = {
        labels: ['Anatomy', 'Physiology', 'Biochemistry', 'Care'], // Subjects
        datasets: [
            {
                data: [82, 86.76, 80.11, 88.67], // Percentage data
                // backgroundColor: ['#B3A2FF', '#5C3DFF', '#9F7BF6', '#8A2BE2'],
                backgroundColor: ['#D4C1FF', '#B79AF6', '#7F56DA', '#5225B8'], // Colors for each bar
                borderColor: '#F3F3F3',
                borderWidth: 1,
                barThickness: 40,
                // Optional: Add border around bars
            },
        ],
    };
    const optionsdoughnut = {
        responsive: true,
        cutoutPercentage: 70,  // This is what makes it a Donut chart (adjusting the inner hole size)
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`, // Customizing tooltip
                },
            },
        },
    };
    const optionshorizontalchart = {
        responsive: true,
        indexAxis: 'y', // Horizontal Bar Chart
        plugins: {
            // tooltip: {
            //     callbacks: {
            //         // Custom Tooltip label
            //         label: (tooltipItem) => `${tooltipItem.raw}%`, // Display percentage in tooltip
            //     },
            // },
            legend: {
                display: false, // Hides the legend
            },
            datalabels: {
                display: true, // Display data labels
                color: '#0000', // Label color
                formatter: (value) => `${value}%`, // Format to show percentage
                font: {
                    weight: 'bold',
                },
                align: 'center', // Align the label at the end of the bar
            },
        },
        scales: {
            x: {
                beginAtZero: true, // Start the X-axis from zero
                max: 100, // Maximum value to show
                ticks: {
                    stepSize: 20, // Set step size for ticks
                },
            },
            y: {
                ticks: {
                    font: {
                        size: 14,
                        family: 'Monosans',
                        weight: 500,
                    },
                },
            },
        },
    }
    const chartData = {
        labels: ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'], // Semester names
        datasets: [
            {
                label: 'Pass',
                data: [8, 9, 8, 9, 8, 9, 8, 9], // Data for Pass category in each semester
                backgroundColor: '#6A4CFF', // Pass color
                borderWidth: 1,
            },
            {
                label: 'Promoted',
                data: [1, 0, 1, 0, 1, 0, 0, 0], // Data for Promoted category in each semester
                backgroundColor: '#FFA500', // Promoted color
                borderWidth: 1,
            },
            {
                label: 'Fail',
                data: [0, 1, 1, 0, 0, 0, 0, 0], // Data for Fail category in each semester
                backgroundColor: '#FF0000', // Fail color
                borderWidth: 1,
            }
        ]
    };
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // Positioning the legend at the top
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.dataset.label + ': ' + tooltipItem.raw; // Display label with data value
                    }
                }
            }
        },
        scales: {
            x: {
                stacked: false, // Enable stacking for x-axis
                barThickness: 5,
            },
            y: {
                stacked: false, // Enable stacking for y-axis
                beginAtZero: true, // Start the y-axis from 0
                ticks: {
                    stepSize: 2, // Set step size for ticks
                },
            }
        }
    };
    const generateRadialBarOptions = (label, percentage, color) => {
        return {
            series: [percentage], // Dynamic percentage value
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 135,
                    track: {
                        background: "#E0E0E0", // Track color (background circle)
                        strokeWidth: "75%",
                        margin: 0, // margin for the track
                        dropShadow: {
                            enabled: false,
                            top: -3,
                            left: 0,
                            blur: 4,
                            opacity: 0.7,
                        },
                    },
                    dataLabels: {
                        name: {
                            show: true,
                            color: '#222F3E',
                            fontWeight: 'light',
                            offsetY: -55,
                        },
                        value: {
                            fontSize: "16px", // Font size for the value
                            color: "#4E4E4E", // Text color for the percentage
                            show: true,
                            offsetY: -15,
                            formatter: function (val) {
                                return val + "%"; // Format as percentage
                            },
                        },
                    },
                },
            },
            fill: {
                type: "solid", // Solid fill, remove gradient for clean look
                colors: [color], // Static color for the filled portion
            },
            stroke: {
                lineCap: "round", // Ensures the ends of the stroke are rounded
                width: 1, // Adjust width of the stroke for thicker appearance
            },
            labels: [label], // Dynamic label in the center
            annotations: {
                position: 'front',
                yaxis: [{
                    y: 0, // Positioning the label for 0
                    y2: 0,
                    borderColor: "#4E4E4E", // Set border color for the labels
                    strokeDashArray: 0,
                    borderWidth: 1,
                    label: {
                        text: '0',
                        style: {
                            color: '#4E4E4E',
                            fontSize: '14px',
                            fontWeight: 'bold',
                        },
                    },
                }, {
                    y: 100, // Positioning the label for 100
                    y2: 100,
                    borderColor: "#4E4E4E", // Set border color for the labels
                    strokeDashArray: 0,
                    borderWidth: 1,
                    label: {
                        text: '100',
                        style: {
                            color: '#4E4E4E',
                            fontSize: '14px',
                            fontWeight: 'bold',
                        },
                    },
                }]
            },
            responsive: [{
                breakpoint: 768, // On smaller screens
                options: {
                    chart: {
                        height: 250, // Smaller height for mobile
                    },
                },
            }],
        };
    };
    const data = [
        {
            professional: 'First Professional',
            averageMarks: 88.40,
            classParticipationRate: 80,
            daysAbsent: 2,
            attendanceRate: '93.33%',
            subjects: [
                { name: 'Anatomy', theoryPaper1: '60/100', theoryPaper2: '55/100', theoryTotal: '115/200', practical: '55/80', viva: '13/20', practicalViva: '68/100', aggregate: '183/300', remark: 'Pass' },
                { name: 'Physiology', theoryPaper1: '58/100', theoryPaper2: '65/100', theoryTotal: '123/200', practical: '42/80', viva: '13/20', practicalViva: '55/100', aggregate: '178/300', remark: 'Pass' }
            ]
        },
        {
            professional: 'Second Professional',
            averageMarks: 85.20,
            classParticipationRate: 75,
            daysAbsent: 1,
            attendanceRate: '96.50%',
            subjects: [
                { name: 'Microbiology', theoryPaper1: '58/100', theoryPaper2: '60/100', theoryTotal: '118/200', practical: '40/80', viva: '12/20', practicalViva: '52/100', aggregate: '170/300', remark: 'Pass' },
                { name: 'Pharmacology', theoryPaper1: '63/100', theoryPaper2: '67/100', theoryTotal: '130/200', practical: '45/80', viva: '15/20', practicalViva: '60/100', aggregate: '195/300', remark: 'Pass' }
            ]
        }
    ];
    const columns = [
        {
            Header: 'subjects',
            accessor: 'name',
            Cell: ({ row }) => (
                <div >
                    {/* {row.original.subjects.map((subject, idx) => (
                        <p key={idx} style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>
                            {subject.name}
                        </p>
                    ))} */}
                    <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.name}</p>
                </div>
            )

        },
        {
            Header: 'Theory Paper-I',
            accessor: 'theoryPaper1',
            Cell: ({ row }) => (
                <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.theoryPaper1}</p>
            )

        },
        {
            Header: 'Theory Paper-II',
            accessor: 'theoryPaper2',
            Cell: ({ row }) => (
                <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.theoryPaper2}</p>
            )
        },
        {
            Header: 'Theory Total',
            accessor: 'theoryTotal',
            Cell: ({ row }) => (
                <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.theoryTotal}</p>
            )
        },
        {
            Header: 'Practical',
            accessor: 'practical',
            Cell: ({ row }) => (
                <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.practical}</p>
            )
        },
        {
            Header: 'Viva',
            accessor: 'viva',
            Cell: ({ row }) => (
                <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.viva}</p>
            )
        }, {
            Header: 'Practical+Viva',
            accessor: 'practicalViva',
            Cell: ({ row }) => (
                <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.practicalViva}</p>
            )
        }, {
            Header: 'Aggregate',
            accessor: 'aggregate',
            Cell: ({ row }) => (
                <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.aggregate}</p>
            )
        },
        {
            Header: 'Remark',
            accessor: 'remark',
            Cell: ({ row }) => (
                <div >
                    <p style={{
                        textAlign: 'left',
                        color: row.original.remark === "Pass" ? 'green' : 'red', // Green if "Pass", Red if "Fail"
                        fontWeight: 600,
                        margin: 0,
                    }}
                    >
                        {row.original.remark}
                    </p>
                </div>
            )
        }
    ];
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div>
                <div className="row">
                    <div className="col-md-12" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: "15px" }}>
                            <img src={previous} onClick={() => { navigate('/studentDashboard') }} style={{ cursor: 'pointer' }}></img>
                            <div>
                                <div className='d-flex align-items-center' style={{ gap: '10px', marginBottom: "5px" }} >
                                    <h4 className='fm-pr-hd m-0' style={{ fontSize: '22px', fontWeight: "600" }}>Chandra Bajaj</h4>
                                    <span className='n-p-t'>23 Year /  F</span>
                                </div>
                                <p className='n-p-t'>3 Yrs Polytechnic Diploma</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: "10px" }}>
                            <div>
                                <div>
                                    <span className='sd-p'>Er. No.</span> <span className='alg-l' style={{ fontWeight: '700' }}>2022010100016</span>
                                </div>
                                <div>
                                    <span className='sd-p'>Student Id</span> <span className='alg-l' style={{ fontWeight: '700' }}>20220101</span>
                                </div>
                            </div>
                            <div onClick={()=>openModal()}>
                                <img src={tablelast} style={{ width: '47px', height: '44px' }}></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="stu-pro">
                                    <div className="chart-item" style={{ borderRadius: '20px' }}>
                                        <h3 className='n-p-t'>Overall Performance by Subject</h3>
                                        <p className='sd-p mt-1 mb-4'>Drill down to show the number of students.</p>
                                        <Doughnut data={donutData} options={optionsdoughnut} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="stu-pro">
                                    <div className="chart-item" style={{ borderRadius: '20px' }}>
                                        <h3 className='n-p-t'>Subject wise Performance</h3>
                                        <p className='sd-p mt-1 mb-4'>Drill down to show the number of students by gender.</p>
                                        <Bar data={BarData} options={optionshorizontalchart} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="stu-pro">
                                    <div className="chart-item" style={{ borderRadius: '20px' }}>
                                        <h3 className='n-p-t'>Overall Performance by Subject</h3>
                                        <p className='sd-p mt-1 mb-4'>Drill down to show the number of students.</p>
                                        <Doughnut data={donutData2} options={optionsdoughnut} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="stu-pro">
                                    <div>
                                        <h3 className='n-p-t'>Overall Performance by Subject</h3>
                                        <p className='sd-p mt-1 mb-4'>Drill down to show the number of students.</p>
                                    </div>
                                    <Bar data={chartData} options={chartOptions} height={61} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="stu-pro">
                            <div>
                                <h3 className='n-p-t'>Avg. Subject Score</h3>
                                <p className='sd-p mt-1 mb-4'>Drill down by gender</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: "40px" }}>
                                {radialData?.map((data, index) => {
                                    return (
                                        <ApexCharts
                                            options={generateRadialBarOptions(data.label, data.percentage, colors[index])}
                                            type="radialBar"
                                            series={[data.percentage]}
                                            height={350}

                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div>
                            <h4 className='fm-pr-hd'>ACADEMIC DETAILS OF STUDENT</h4>
                        </div>
                        <div className="stu-pro" style={{ padding: '0', display: 'flex', flexDirection: 'column', gap: '20px', background: 'white' }}>
                            {data?.map((section, index) => (
                                <div key={index} style={{ background: '#f9f9f9', padding: "0 10px" }}>
                                    <div className='row' style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                                        <div className='col-md-3'>
                                            <h4 className="fm-pr-hd">{section.professional}</h4>
                                        </div>
                                        <div className='col-md-8' style={{ display: 'flex', gap: "10px" }}>
                                            <div style={{ display: 'flex', gap: "10px" }}>
                                                <p className="n-p-t" style={{ fontWeight: "600" }}>Average Marks:</p><span>{section.averageMarks}</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: "10px" }}>
                                                <p className="n-p-t" style={{ fontWeight: "600" }}>Class Participation Rate:</p><span>{section.classParticipationRate}%</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: "10px" }}>
                                                <p className="n-p-t" style={{ fontWeight: "600" }}>Days Absent:</p><span>{section.daysAbsent}</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: "10px" }}>
                                                <p className="n-p-t" style={{ fontWeight: "600" }}>Attendance Rate:</p><span>{section.attendanceRate}</span>
                                            </div>
                                        </div>
                                        <div className='col-md-1' style={{ textAlign: 'right' }}>
                                            <img
                                                src={arrowup} // Use your arrow image
                                                onClick={() => toggleTableVisibility(section.professional)} // Toggle only the current section
                                                style={{
                                                    transform: isTableVisible === section.professional ? "rotate(180deg)" : "rotate(0deg)", // Rotate based on visibility
                                                    transition: "transform 0.3s ease",
                                                    cursor: 'pointer'
                                                }}
                                                alt="Toggle arrow"
                                            />
                                        </div>
                                    </div>

                                    {/* Show the table for the section if it's visible */}
                                    {isTableVisible === section.professional && (
                                        <div
                                            style={{
                                                maxHeight: isTableVisible === section.professional ? "500px" : "0", // Smooth expand/collapse effect
                                                overflow: "hidden",
                                                transition: "max-height 0.5s ease",
                                            }}
                                        >
                                            <CollapsibleTable data={section.subjects} columns={columns} />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {/* {isTableVisible && <CollapsibleTable data={data} columns={columns} />} */}
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen?<GenerateIDModal isOpen={openModal} onClose={closeModal} setpaymentmodal={setpaymentmodal}/>:''}
            {paymentmodal?<IDValidityModal sOpen={openModal} onClose={closeModal} setpaymentmodal={setpaymentmodal} setcardpreview={setcardpreview}/>:''}
            {cardpreview?<IDPreviewModal setcardpreview={setcardpreview} orgname='Banaras Institute Of Polytechnic & Engineering College'/>:''}
        </>
    )
}
