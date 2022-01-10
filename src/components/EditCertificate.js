import React, { useCallback, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import './components.css'
import { ErrorMessage, Field, Form, Formik } from 'formik';

function EditCertificate({showEditModal,hideShowEditModal,updateEdit,selectedCertificate}) {
    const [certificate, setCertificate] = useState({
        certificateName: '',
        certificateFrom: '',
        yearOfCompletion: ''
    });
    const [errors, setErrors] = useState({
        NameError: '',
        CertificateFromError: '',
        YearOfCompletionError: '',
    })

    const validateName = useCallback(
        () => {
            if (certificate.certificateName) {
                if (certificate.certificateName.length < 5) {
                    setErrors({
                        ...errors,
                        NameError: 'Certification Name should have minimum of 5 characters'
                    })
                }
                else{return true}
                
            }
            else {
                setErrors({
                    NameError: 'Certification Name is Required'
                })
                return false;
            }
        },
        [certificate.certificateName],
    )
    const validateCertificateFrom = () => {
        if (certificate.certificateFrom) {
            if (certificate.certificateFrom.length < 5) {
                setErrors({
                    CertificateFromError: 'Certifed From should have minimum of 5 characters'
                })
            }
            else{return true}
        }
        else {
            setErrors({
                CertificateFromError: 'Certified From is Required'
            })
        }
    }
    const validateYearOfCompletion = () => {
        if (certificate.yearOfCompletion) {
            if (!(certificate.yearOfCompletion > 1950 && certificate.yearOfCompletion < 2022)) {
                setErrors({
                    YearOfCompletionError: 'Year of Completion must be between 1951-2022'
                })
                return false;
            }
            else{return true}
        }
        else {
            setErrors({
               YearOfCompletionError: 'Year Of Completion is Required'
            })
            return false;
        }
    }

    useEffect(() => {
        setCertificate({...selectedCertificate})
    }, [selectedCertificate])

    let handleChange = (event) => {
        // console.log(event.target.value);
        setCertificate({
            ...certificate,
            [event.target.name]:event.target.value
        })
    }
    let handleClose = () => {
        hideShowEditModal()
    }

    let editCertificate=()=>{
        validateName();
        validateCertificateFrom();
        validateYearOfCompletion();
        if (validateName() && validateCertificateFrom() && validateYearOfCompletion()) {
        updateEdit(certificate)
        
        
        setCertificate({
        certificateName: '',
        certificateFrom: '',
        yearOfCompletion: ''})

        setErrors({
            NameError: '',
            CertificateFromError: '',
            YearOfCompletionError: '',
        })
    }
}

    return (
        <div>
            <Modal show={showEditModal} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title >Edit Certificates</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik>
                        {(props)=>(
                            <Form>
                        <div>
                        <label>Certification Name</label>
                            <Field
                                type="text"
                                className="form-control mb-2"
                                name="certificateName"
                                placeholder='Enter Certificate Name'
                                value={certificate.certificateName}
                                onChange={handleChange}
                            />
                            {errors.NameError && <div className='errMsg'>{errors.NameError}</div>}
                            <p className='error'><ErrorMessage name="Name" /></p>
                        </div>
                        <div>
                            <label>Certification From</label>
                            <Field
                                type="text"
                                className="form-control mb-2"
                                name="certificateFrom"
                                placeholder='Enter Certified From'
                                value={certificate.certificateFrom}
                                onChange={handleChange}
                            />
                            {errors.CertificateFromError && <div className='errMsg'>{errors.CertificateFromError}</div>}
                            <p className='error'><ErrorMessage name="CertificateFrom" /></p>
                        </div>
                        <div>
                            <label>Year Of Completition</label>
                            <Field
                                type="number"
                                className="form-control mb-2"
                                name="yearOfCompletion"
                                placeholder='Enter Year Of Completion'
                                value={certificate.yearOfCompletion}
                                onChange={handleChange}
                            />
                            {errors.YearOfCompletionError && <div className='errMsg'>{errors.YearOfCompletionError}</div>}
                            <p className='error'><ErrorMessage name="YearOfCompletion" /></p>
                        </div>
                    </Form>
                        )}
                        </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className='btn-success' onClick={editCertificate}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditCertificate