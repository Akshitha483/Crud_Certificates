import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import React, {  useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import './components.css'


function AddCertificate({ showAddModal, hideShowAddModal, updateCertificates }) {

    // let initialValues={
    //     certificateName:'',
    //     certificateFrom:'',
    //     yearOfCompletion:'',
    // }
    
    // let validationSchema = yup.object().shape({
    //     certificateName: yup.string().min(5).required("Certification name is required"),
    //     certificateFrom: yup.string().min(5).required("Certificate from is required"),
    //     yearOfCompletion: yup.number().min(2).max(4).required("Year of completion is required"),
        
    // })

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

    const validateName = () => {
            if (certificate.certificateName) {
                if (certificate.certificateName.length < 5) {
                    setErrors({
                        ...errors,
                        NameError: 'Certification Name should have minimum of 5 characters'
                    })
                }
                else{
                    return true
                }
                
            }
            else {
                setErrors({
                    NameError: 'Certification Name is Required'
                })
            }
        }
    
    const validateCertificateFrom = () => {
        if (certificate.certificateFrom) {
            if (certificate.certificateFrom.length < 4) {
                setErrors({
                    CertificateFromError: 'Certified From should have minimum of 7 characters'
                })
            }
            else{
                return true
            }
        }
        else {
            setErrors({
                CertificateFromError: 'Certified From is Required'
            })
        }
    }
    const validateYearOfCompletion= () => {
        if (certificate.yearOfCompletion) {
            if (!(certificate.yearOfCompletion > 1950 && certificate.yearOfCompletion < 2022)) {
                setErrors({
                   YearOfCompletionError: 'Year of Completion must be between 1951-2022'
                })
                return false;
            }
            else{
                return true
            }
        }
        else {
            setErrors({
                YearOfCompletionError: 'Year Of Completion is Required'
            })
            return false;
        }
    }

    let handleClose = () => {
        hideShowAddModal()
    }

    let handleChange = (event) => {
        // console.log(event.target.value);
        setCertificate({
            ...certificate,
            [event.target.name]: event.target.value
        })
    }

    let addCertificate = () => {
        // console.log('inside add',certificate);
        validateName();
        validateCertificateFrom();
        validateYearOfCompletion();
        if (validateName() && validateCertificateFrom() && validateYearOfCompletion()) {
            updateCertificates(certificate)
            setCertificate({
                certificateName: '',
                certificateFrom: '',
                yearOfCompletion: ''
            })
            setErrors({
                NameError: '',
                CertificateFromError: '',
                YearOfCompletionError: '',
            })
        }
    }

    return (
        <div>
            <Modal show={showAddModal} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title >Add Certificate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik>
            {/* //         initialValues={initialValues}
            // onSubmit={addCertificate}
            // validationSchema={validationSchema}> */}
                        {(props) => (
                            <Form>
                                <div>
                                    <label>Certification Name</label>
                                    <Field
                                        type="text"
                                        className="form-control mb-2"
                                        name="certificateName"
                                        placeholder='Enter Certificate Name'
                                        value={certificate.certificateName}
                                        autoComplete='off'
                                        onChange={handleChange}
                                    />
                                    {errors.NameError && <div className='errMsg'>{errors.NameError}</div>}
                                    <p className='error'><ErrorMessage name="Name" /></p>
                                </div>
                                <div>
                                    <label>Certified From</label>
                                    <Field
                                        type="text"
                                        className="form-control mb-2"
                                        name="certificateFrom"
                                        autoComplete='off'
                                        placeholder='Enter Certified From'
                                        value={certificate.certificateFrom}
                                        onChange={handleChange}
                                    />
                                    {errors.CertificateFromError && <div className='errMsg'>{errors.CertificateFromError}</div>}
                                    <p className='error'><ErrorMessage name="CertificateFrom" /></p>
                                </div>
                                <div>
                                    <label>Year Of Completion</label>
                                    <Field
                                        type="number"
                                        className="form-control mb-2"
                                        name="yearOfCompletion"
                                        autoComplete='off'
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
                    <Button variant="primary" className='btn-success' onClick={addCertificate} >
                        Add Certificate
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddCertificate