import '../../../../styles/styles.css'
import { Link } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';
import { useMediaQuery } from 'react-responsive';
import React, { useEffect, useState } from 'react';
import { IAuthorizedContract } from '../../../../types';
import { Input, Table, Select, Pagination } from 'antd';
import { ExtendedPath } from '../../../../types/custom-types';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import PopUpReasonCancel from '../../popup/contract/PopUpReasonCancel';
import { getIAuthorizedContracts, getIAuthorizedContractById } from '../../../../redux/actions/authorizedContractAction';

const { Option } = Select;

const FormContractAuthorized: React.FC = () => {
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState<IAuthorizedContract[]>([]);
    
    const [reasonCancel, setReasonCancel] = useState(false);
    const [selectedContract, setSelectedContract] = useState<IAuthorizedContract | null>(null);

    const showModalReason = async (record: IAuthorizedContract) => {
        setSelectedContract(record);
        setReasonCancel(true);
        try {
            if (record.id) { 
                const data = await getIAuthorizedContractById(record.id);
                setSelectedContract(data);
            } else {
                throw new Error('Record id is undefined.');
            }
        } catch (error) {
            console.error('Error fetching contract data:', error);
        }
    };


    const closeModalReason = () => {
        setReasonCancel(false);
        setSelectedContract(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
            const contracts = await getIAuthorizedContracts();
            setData(contracts);
            } catch (error) {
            console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    });

    const dataSourceWithRowNumber = data.map((item, index) => ({ ...item, rowNumber: index + 1 }));

    const columns = [
        {
            title: 'STT',
            dataIndex: 'rowNumber',
            key: 'rowNumber',
        },
        {
            title: 'Số hợp đồng',
            key: 'number',
            dataIndex: 'number',
        },
        {
            title: 'Tên hợp đồng',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Người ủy quyền',
            key: 'person',
            dataIndex: 'person',
        },
        {
            title: 'Quyền sở hữu',
            key: 'ownership',
            dataIndex: 'ownership',
        },
        {
            title: 'Hiệu lực hợp đồng',
            key: 'validity',
            dataIndex: 'validity',
            render: (validity: number) => {
                let text = '';
                let color = '';
                switch (validity) {
                    case 1:
                        text = 'Mới';
                        color = 'green';
                        break;
                    case 2:
                        text = 'Còn thời hạn';
                        color = 'blue';
                        break;
                    case 3:
                        text = 'Đã hết hạn';
                        color = 'gray';
                        break;
                    default:
                        text = 'Đã hủy';
                        color = 'red';
                        break;
                }   
                return (
                    <>
                        <div style={{ display: 'inline-flex', marginRight: '6px', width: '8px', height: '8px', borderRadius: '100%', border: `1px solid ${color}`, backgroundColor: color }}></div>
                        {text}
                    </>
                );
            }
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'create_at',
            key: 'create_at',
            render: (create_at: Timestamp) => (
                <span>
                    {create_at.toDate().toLocaleDateString()}
                    {' '}
                    {create_at.toDate().toLocaleTimeString()}
                </span>
            )
        },
        {
            title: '',
            dataIndex: 'column8',
            key: 'column8',
            render: (text: string, record: any) => (
                <Link
                    to={{
                        pathname: `/info-authorized-contract/${record.id}`,
                        state: { contractData: record }
                    } as ExtendedPath}
                    style={{ color: 'orange' }}
                >
                    Xem chi tiết
                </Link>
            ),
        },
        {
            title: '',
            dataIndex: 'column9',
            key: 'column9',
            render: (text: string, record: IAuthorizedContract) => (
                record.validity === 4 ? (
                <div
                    style={{ color: 'orange', cursor: 'pointer' }}
                    onClick={() => showModalReason(record)}
                >
                    Lý do hủy
                </div>
                ) : null
            ),
        }
    ];

     const handlePageChange = (page: any, pageSize: any) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

  return (
    <div>
        {isDesktopOrLaptop ? (
            <div className='form-content'>
                <div className='form-filter' style={{ width: '1683px'}}>
                    <div className='select-container'>
                        <div style={{ marginRight: '10px' }}>Quyền sở hữu:</div>
                        <Select className='form-dropdown' placeholder="Tất cả" suffixIcon={<DownOutlined style={{ color: 'orange' }} />}>
                            <Option key='1' value='1' className='form-option'>Người biểu diễn</Option>
                            <Option key='2' value='2' className='form-option'>Nhà sản xuất</Option>
                        </Select>
                    </div>

                    <div className='select-container' style={{ marginLeft: '64px' }}>
                        <div style={{ marginRight: '10px' }}>Hiệu lực hợp đồng:</div>
                        <Select className='form-dropdown' placeholder="Tất cả" suffixIcon={<DownOutlined style={{ color: 'orange' }} />}>
                            <Option key='1' value='1' className='form-option'>Mới</Option>
                            <Option key='2' value='2' className='form-option'>Còn thời hạn</Option>
                            <Option key='3' value='3' className='form-option'>Hết hạn</Option>
                            <Option key='3' value='3' className='form-option'>Hủy</Option>
                        </Select>
                    </div>

                    <div className='select-container' style={{marginLeft: 'auto'}}>
                        <Input
                            className='form-search'
                            placeholder="Tên hợp đồng, số hợp đồng, người uỷ quyền..."
                            suffix={<SearchOutlined style={{ color: 'white' }} />}
                        />
                    </div>
                </div>

                <div className='form-table' style={{ width: '1683px'}}>
                    <div className='table-content'>
                        <Table 
                            rowKey="index"
                            columns={columns} 
                            pagination={false}
                            className="custom-table"
                            dataSource={dataSourceWithRowNumber} 
                        />
                    </div>
                    <div className='custom-show-page' style={{ width: '1650px'}}>
                        <div> 
                            Hiển thị 
                                <span 
                                    style={{ 
                                        width: '48px', 
                                        height: '32px', 
                                        border: '1px solid orange', 
                                        borderRadius: '4px', 
                                        display: 'inline-flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        margin: '0 5px' 
                                    }}
                                >
                                    {dataSourceWithRowNumber.length}
                                </span> 
                            hàng trong mỗi trang
                        </div>                        
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize} 
                            total={data.length} 
                            className='custom-paginate'
                            onChange={handlePageChange} 
                        />
                    </div>
                </div>
            </div>
        ) : (
            <div className='form-content'>
                <div className='form-filter'>
                    <div className='select-container'>
                        <div style={{ marginRight: '10px' }}>Quyền sở hữu:</div>
                        <Select className='form-dropdown' placeholder="Tất cả" suffixIcon={<DownOutlined style={{ color: 'orange' }} />}>
                            <Option key='1' value='1' className='form-option'>Người biểu diễn</Option>
                            <Option key='2' value='2' className='form-option'>Nhà sản xuất</Option>
                        </Select>
                    </div>

                    <div className='select-container' style={{ marginLeft: '64px' }}>
                        <div style={{ marginRight: '10px' }}>Hiệu lực hợp đồng:</div>
                        <Select className='form-dropdown' placeholder="Tất cả" suffixIcon={<DownOutlined style={{ color: 'orange' }} />}>
                            <Option key='1' value='1' className='form-option'>Mới</Option>
                            <Option key='2' value='2' className='form-option'>Còn thời hạn</Option>
                            <Option key='3' value='3' className='form-option'>Hết hạn</Option>
                            <Option key='3' value='3' className='form-option'>Hủy</Option>
                        </Select>
                    </div>

                    <div className='select-container' style={{marginLeft: 'auto'}}>
                        <Input
                            className='form-search'
                            placeholder="Tên hợp đồng, số hợp đồng, người uỷ quyền..."
                            suffix={<SearchOutlined style={{ color: 'white' }} />}
                        />
                    </div>
                </div>

                <div className='form-table'>
                    <div className='table-content'>
                        <Table 
                            rowKey="index"
                            className="custom-table" 
                            columns={columns} 
                            pagination={false}
                            dataSource={dataSourceWithRowNumber} 
                        />
                    </div>
                    <div className='custom-show-page'>
                        <div> 
                            Hiển thị 
                                <span 
                                    style={{ 
                                        width: '48px', 
                                        height: '32px', 
                                        border: '1px solid orange', 
                                        borderRadius: '4px', 
                                        display: 'inline-flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        margin: '0 5px' 
                                    }}
                                >
                                    {dataSourceWithRowNumber.length}
                                </span> 
                            hàng trong mỗi trang
                        </div>                        
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize} 
                            total={data.length} 
                            className='custom-paginate'
                            onChange={handlePageChange} 
                        />
                    </div>
                </div>
            </div>
        )}

        {selectedContract && (
            <PopUpReasonCancel
                open={reasonCancel}
                onClose={closeModalReason}
                contract={selectedContract}
            />
        )}
    </div>
  );
};

export default FormContractAuthorized;
