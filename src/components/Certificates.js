import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import AddCertificate from './AddCertificate';
import EditCertificate from './EditCertificate';
import './components.css'

function Certificates() {
    const [certificates, setCertificates] = useState([])
    const [showAddModal, setshowAddModal] = useState(false);
    const [showEditModal, setshowEditModal] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState({})
    const [selectedCertificateIndex, setSelectedCertificateIndex] = useState('')
    

    //open add certificate modal
    let updateShowAddModal = () => {
        setshowAddModal(true)
    }
    //close add certificate modal
    let hideShowAddModal = () => {
        setshowAddModal(false);
    };


    let updateCertificates = (certificate) => {
        let certificateCopy = [...certificates]
        certificateCopy.push(certificate)
        setCertificates(certificateCopy)
        alert("Certificate Added Successfully")
    }

    //Edit Certificate
    let updateEdit = async (certificate) => {
        let certificateCopy = [...certificates]
        certificateCopy.splice(selectedCertificateIndex, 1, certificate)
        setCertificates(certificateCopy)
        setSelectedCertificateIndex('')
        setshowEditModal(false)
        alert("Certificate Updated Successfully")
    }
    let updateShowEditModal = (certificate, index) => {
        setshowEditModal(true)
        setSelectedCertificateIndex(index)
        setSelectedCertificate(certificate)
    }
    let hideShowEditModal = () => {
        setshowEditModal(false)
    }

    let deleteCertificate = (index) => {
        if (window.confirm('Are you sure to Delete this Certificate?')) {
            let certificateCopy = [...certificates]
            certificateCopy.splice(index, 1)
            setCertificates(certificateCopy)
        }
    }


    return (
        <div>
            <Table striped bordered hover>
                <thead >
                    <tr>
                        <th>Id</th>
                        <th>Certification Name</th>
                        <th>Certified From</th>
                        <th>Year Of Completion</th>
                        <th><button className="btn btn-success" onClick={updateShowAddModal}>Add</button></th>
                    </tr>
                </thead>
                <tbody>
                    {certificates.length > 0 && certificates.map((values, idx) => {
                        return <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{values.certificateName}</td>
                            <td>{values.certificateFrom}</td>
                            <td>{values.yearOfCompletion}</td>
                            <td><button type="button" className="btn btn-info" onClick={() => updateShowEditModal(values, idx)}>Edit</button>
                                <button type='button' className='btn btn-danger' onClick={() => deleteCertificate(idx)}>Delete</button></td>
                        </tr>
                    })
                    }


                </tbody>
            </Table>

            <AddCertificate showAddModal={showAddModal}
                hideShowAddModal={hideShowAddModal}
                updateCertificates={updateCertificates}
            />

            <EditCertificate showEditModal={showEditModal}
                hideShowEditModal={hideShowEditModal}
                updateEdit={updateEdit}
                selectedCertificate={selectedCertificate}
            />
        </div>
    )
}

export default Certificates