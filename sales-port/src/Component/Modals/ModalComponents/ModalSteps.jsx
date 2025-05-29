import React from 'react';
import check from '../../../assets/icons/Vector (8).svg'

export const ModalSteps = ({ steps, currentStep }) => {
    return (
        <>
            <div className="d-flex justify-content-center">
                <ul className="list-unstyled d-flex " style={{ flexDirection: 'column', gap: '20px' }}>
                    {steps?.map((step, index) => (
                        <li className="step-item flex-fill text-center" key={index} style={{ display: 'flex', gap: "10px",alignItems:'center' }}>
                            <div
                                className={`step-circle ${index < currentStep ? 'completed' : ''
                                    } ${index === currentStep ? 'active' : ''}`}
                            >
                                {index < currentStep ? (
                                    <img src={check}></img> // Checkmark for completed steps
                                ) : (
                                    ''
                                )}
                            </div>
                            <div
                                className={`text-steps ${index < currentStep ? 'text-muted-steps' : ''
                                } ${index === currentStep ? 'text-primary-steps' : ''}`}
                            >
                                {step}
                            </div>

                            {/* Step line */}
                            {index < steps.length - 1 && (
                                <div className={`step-line ${index < currentStep ? 'completed' : ''
                                } ${index === currentStep ? 'active' : ''}`}></div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
