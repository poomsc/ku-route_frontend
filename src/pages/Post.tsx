import React from 'react'
import '../Post.css';
import { Container, Card } from 'react-bootstrap';
import { useState } from 'react';
const PostPage = () => {

    const mockTags = ["คลังหนังสือ", 'ชีทสรุป'];
    const mockFiles = [
        ['สรุปบทที่ 1.pdf', '23.40 MB'],
        ['สรุปบทที่ 2.pdf', '4.70 MB'],
        ['สรุปบทที่ 3.pdf', '5.20 MB'],
        ['สรุปแถม.jpg', '2.70 MB']
    ]
    const mockFileType = ['pdf', 'pdf', 'pdf', 'jpg']
    const mockFileName = ['สรุปบทที่ 1.pdf', 'สรุปบทที่ 2.pdf', 'สรุปบทที่ 3.pdf', 'สรุปแถม.jpg']
    const mockFileSize = ['23.40 MB', '4.70 MB', '5.20 MB', '2.70 MB']
    let postOwner = 'Traiman Hansa';
    let datePosted = '05/06/2564';
    let title = 'แจกไฟล์สรุป midterm วิชา Software Engineering'
    let descript = 'แจกสรุป วิชา Software Engineer (01204241) สำหรับ midterm  ดาวน์โหลดได้ที่ไฟล์ด้านล่างนี้ถ้าตกหล่นตรงไหนมาแชร์กันได้ครับ'
    const mockSubjectName = ['01204241', 'Software Engineer'];
    const [allTag, setAllTag] = useState<string[]>(mockTags);
    const [allFile, setAllFile] = useState<string[][]>(mockFiles);
    const colors = [
        "#5697C4",
        "#E0598B",
        "#E278A3",
        "#9163B6",
        "#993767",
        "#A34974",
        "#BE5168",
        "#C84A52",
        "#E16452",
        "#F19670",
        "#E9D78E",
        "#E4BE7F",
        "#74C493",
    ];
    const maxColor = colors.length;
    return (
        <div className="white-bg py-5">
            <Container className='rounded box-shadow bg-white mx-auto mb-4'>
                <div className=''>
                    <div className='d-inline-flex'>
                        {allTag.map((tag, idx) => (
                            <div
                                className="max-w-content px-2 rounded cursor-pointer align-self-center px-2 py-1 mr-2"
                                key={tag}
                                style={{
                                    backgroundColor: colors[maxColor - (idx % maxColor) - 1],
                                }}
                            >
                                {tag}
                            </div>
                        ))}</div>
                    <div className='float-right'>
                        {mockSubjectName}
                    </div>
                </div>
                <h2 style={{ fontWeight: 'bold' }}>{title}</h2>

            </Container>
            <Container className='rounded box-shadow bg-white mx-auto mb-4'>
                <h5 style={{ fontWeight: 'bold' }}>ไฟล์ที่แนบมาด้วย</h5>
                <div className="d-flex">
                    {allFile.map((file) =>
                    (
                        <div
                            className='rounded mr-2 bg-light'
                            style={{ border: 'black solid 0.5px' }}
                            key={file[0]}
                        >
                            {

                            }
                            {file[0].split('.')[1] === 'pdf' ?
                                (<p>true</p>)
                                :
                                (<p>false</p>)
                            }
                            {/* <img src={logo} width='5px' alt='png'/> */}
                            {file[0]}
                            <br />
                            {file[1]}
                        </div>
                    ))

                    }</div>
            </Container>
            <Container className='rounded box-shadow bg-white mx-auto px-0'>
                <h5 style={{ fontWeight: 'bold' }}>การตอบกลับ</h5>
                <div>ตอบกลับโพสต์นี้</div>
            </Container>
        </div>
    )
}

export default PostPage