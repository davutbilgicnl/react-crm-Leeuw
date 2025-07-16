import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarGroup, Box, Button, Card, List, Stack, Tab, TablePagination, Tabs, Toolbar, Typography, Link, MenuItem, Select } from '@mui/material'
import styled from '@emotion/styled';
import { LeadUrl } from '../../services/ApiUrls';
import { DeleteModal } from '../../components/DeleteModal';
import { Label } from '../../components/Label';
import { fetchData } from '../../components/FetchData';
import { Spinner } from '../../components/Spinner';
import FormatTime from '../../components/FormatTime';
import { getComparator, stableSort } from '../../components/Sorting';
import { FaTrashAlt } from 'react-icons/fa';
import { FiChevronUp } from '@react-icons/all-files/fi/FiChevronUp';
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown';
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { FiChevronLeft } from "@react-icons/all-files/fi/FiChevronLeft";
import { FiChevronRight } from "@react-icons/all-files/fi/FiChevronRight";
import { CustomTab, CustomToolbar, FabLeft, FabRight } from '../../styles/CssStyled';
import { mockLeads, mockUsers } from '../../data/mockData';
import '../../styles/style.css'

export const CustomTablePagination = styled(TablePagination)`
.MuiToolbar-root {
  min-width: 100px;
}
.MuiTablePagination-toolbar {
  background-color: #f0f0f0;
  color: #333;
}
.MuiTablePagination-caption {
  color: #999;
}
'.MuiTablePagination-displayedRows': {
  display: none;
}
'.MuiTablePagination-actions': {
  display: none;
}
'.MuiTablePagination-selectLabel': {
  margin-top: 4px;
  margin-left: -15px;
}
'.MuiTablePagination-select': {
  color: black;
  margin-right: 0px;
  margin-left: -12px;
  margin-top: -6px;
}
'.MuiSelect-icon': {
  color: black;
  margin-top: -5px;
}
background-color: white;
border-radius: 1;
height: 10%;
overflow: hidden;
padding: 0;
margin: 0;
width: 39%;
padding-bottom: 5;
color: black;
margin-right: 1;
`;

export const Tabss = styled(Tab)({
  height: '34px',
  textDecoration: 'none',
  fontWeight: 'bold'
});

export const ToolbarNew = styled(Toolbar)({
  minHeight: '48px', height: '48px', maxHeight: '48px',
  width: '100%', display: 'flex', justifyContent: 'space-between', backgroundColor: '#1A3353',
  '& .MuiToolbar-root': { minHeight: '48px !important', height: '48px !important', maxHeight: '48px !important' },
  '@media (min-width:600px)': {
    '& .MuiToolbar-root': {
      minHeight: '48px !important', height: '48px !important', maxHeight: '48px !important'
    }
  }
});

export default function Leads(props: any) {
  const navigate = useNavigate()
  const [tab, setTab] = useState('open');
  const [loading, setLoading] = useState(true);

  const [leads, setLeads] = useState<any[]>([])
  const [valued, setValued] = useState(10)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)
  const [initial, setInitial] = useState(true)
  const [order] = useState('asc')
  const [orderBy] = useState('calories')

  const [openLeads, setOpenLeads] = useState<any[]>([])
  const [openLeadsCount, setOpenLeadsCount] = useState(0)
  const [closedLeads, setClosedLeads] = useState<any[]>([])
  const [openClosedCount, setClosedLeadsCount] = useState(0)
  const [contacts, setContacts] = useState<any[]>([])
  const [status, setStatus] = useState<any[]>([])
  const [source, setSource] = useState<any[]>([])
  const [companies, setCompanies] = useState<any[]>([])
  const [tags, setTags] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [countries, setCountries] = useState<any[]>([])
  const [industries, setIndustries] = useState<any[]>([])

  const [selectOpen, setSelectOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsPerPage, setRecordsPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [openCurrentPage, setOpenCurrentPage] = useState<number>(1);
  const [openRecordsPerPage, setOpenRecordsPerPage] = useState<number>(10);
  const [openTotalPages, setOpenTotalPages] = useState<number>(0);
  const [openLoading, setOpenLoading] = useState(true);

  const [closedCurrentPage, setClosedCurrentPage] = useState<number>(1);
  const [closedRecordsPerPage, setClosedRecordsPerPage] = useState<number>(10);
  const [closedTotalPages, setClosedTotalPages] = useState<number>(0);
  const [closedLoading, setClosedLoading] = useState(true);

  const [deleteLeadModal, setDeleteLeadModal] = useState(false)
  const [selectedId, setSelectedId] = useState('')

  // Mock data kullanarak leads'leri yükle
  useEffect(() => {
    const loadMockData = () => {
      setLoading(true);
      
      // Mock data'yı Open ve Closed olarak ayır
      const openMockLeads = mockLeads.filter(lead => lead.status === 'Open');
      const closedMockLeads = mockLeads.filter(lead => lead.status === 'Closed');
      
      // Mock data ile state'leri güncelle
      setTimeout(() => {
        setOpenLeads(openMockLeads as any);
        setOpenLeadsCount(openMockLeads.length);
        setOpenTotalPages(Math.ceil(openMockLeads.length / openRecordsPerPage));
        
        setClosedLeads(closedMockLeads as any);
        setClosedLeadsCount(closedMockLeads.length);
        setClosedTotalPages(Math.ceil(closedMockLeads.length / closedRecordsPerPage));
        
        // Mock helper data
        setUsers(mockUsers as any);
        setContacts([]);
        setStatus([{ id: 1, name: 'Open' }, { id: 2, name: 'Closed' }]);
        setSource([{ id: 1, name: 'Website' }, { id: 2, name: 'Email Campaign' }, { id: 3, name: 'Social Media' }]);
        setCompanies([]);
        setTags([]);
        setCountries([]);
        setIndustries([]);
        
        setLoading(false);
        setOpenLoading(false);
        setClosedLoading(false);
      }, 1000); // 1 saniye loading simülasyonu
    };

    loadMockData();
  }, [openRecordsPerPage, closedRecordsPerPage]);

  // Gerçek API çağrısı yerine mock data kullan
  const getLeads = async () => {
    // Bu fonksiyon artık mock data kullanıyor, gerçek API çağrısı yapmıyor
    console.log('Mock data already loaded');
  }

  const handleChangeTab = (e: SyntheticEvent, val: any) => {
    setTab(val)
  }

  const handleRecordsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (tab == 'open') {
      setOpenLoading(true)
      setOpenRecordsPerPage(parseInt(event.target.value));
      setOpenCurrentPage(1);
    } else {
      setClosedLoading(true)
      setClosedRecordsPerPage(parseInt(event.target.value));
      setClosedCurrentPage(1);
    }
  };

  const handlePreviousPage = () => {
    if (tab == 'open') {
      setOpenLoading(true)
      setOpenCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    } else {
      setClosedLoading(true)
      setClosedCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }
  };

  const handleNextPage = () => {
    if (tab == 'open') {
      setOpenLoading(true)
      setOpenCurrentPage((prevPage) => Math.min(prevPage + 1, openTotalPages));
    } else {
      setClosedLoading(true)
      setClosedCurrentPage((prevPage) => Math.min(prevPage + 1, closedTotalPages));
    }
  };

  const onAddHandle = () => {
    if (!loading) {
      navigate('/app/leads/add-leads', {
        state: {
          detail: false,
          contacts: contacts || [], 
          status: status || [], 
          source: source || [], 
          companies: companies || [], 
          tags: tags || [], 
          users: users || [], 
          countries: countries || [], 
          industries: industries || []
        }
      })
    }
  }

  const selectLeadList = (leadId: any) => {
    navigate(`/app/leads/lead-details`, { 
      state: { 
        leadId, 
        detail: true, 
        contacts: contacts || [], 
        status: status || [], 
        source: source || [], 
        companies: companies || [], 
        tags: tags || [], 
        users: users || [], 
        countries: countries || [], 
        industries: industries || [] 
      } 
    })
  }

  const deleteLead = (deleteId: any) => {
    setDeleteLeadModal(true)
    setSelectedId(deleteId)
  }

  const deleteLeadModalClose = () => {
    setDeleteLeadModal(false)
    setSelectedId('')
  }

  const modalDialog = 'Are You Sure You want to delete selected Lead?'
  const modalTitle = 'Delete Lead'

  const deleteItem = () => {
    // Mock delete - sadece state'den kaldır
    const updatedOpenLeads = openLeads.filter((lead: any) => lead.id !== selectedId);
    const updatedClosedLeads = closedLeads.filter((lead: any) => lead.id !== selectedId);
    
    setOpenLeads(updatedOpenLeads);
    setClosedLeads(updatedClosedLeads);
    setOpenLeadsCount(updatedOpenLeads.length);
    setClosedLeadsCount(updatedClosedLeads.length);
    
    deleteLeadModalClose();
  }

  const formatDate = (inputDate: string): string => {
    const currentDate = new Date();
    const targetDate = new Date(inputDate);
    const timeDifference = currentDate.getTime() - targetDate.getTime();

    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    const monthsDifference = Math.floor(daysDifference / 30);

    if (monthsDifference >= 12) {
      const yearsDifference = Math.floor(monthsDifference / 12);
      return `${yearsDifference} ${yearsDifference === 1 ? 'year' : 'years'} ago`;
    } else if (monthsDifference >= 1) {
      return `${monthsDifference} ${monthsDifference === 1 ? 'month' : 'months'} ago`;
    } else if (daysDifference >= 1) {
      return `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
    } else if (hoursDifference >= 1) {
      return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutesDifference >= 1) {
      return `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return `${secondsDifference} ${secondsDifference === 1 ? 'second' : 'seconds'} ago`;
    }
  };

  const recordsList = [[10, '10 Records per page'], [20, '20 Records per page'], [30, '30 Records per page'], [40, '40 Records per page'], [50, '50 Records per page']]

  return (
    <Box sx={{ mt: '60px' }}>
      <CustomToolbar>
        <Tabs defaultValue={tab} onChange={handleChangeTab} sx={{ mt: '26px' }}>
          <CustomTab value="open" label="Open"
            sx={{
              backgroundColor: tab === 'open' ? '#F0F7FF' : '#284871',
              color: tab === 'open' ? '#3f51b5' : 'white',
            }} />
          <CustomTab value="closed" label="Closed"
            sx={{
              backgroundColor: tab === 'closed' ? '#F0F7FF' : '#284871',
              color: tab === 'closed' ? '#3f51b5' : 'white',
              ml: '5px',
            }}
          />
        </Tabs>

        <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Select
            value={tab === 'open' ? openRecordsPerPage : closedRecordsPerPage}
            onChange={(e: any) => handleRecordsPerPage(e)}
            open={selectOpen}
            onOpen={() => setSelectOpen(true)}
            onClose={() => setSelectOpen(false)}
            className={`custom-select`}
            onClick={() => setSelectOpen(!selectOpen)}
            IconComponent={() => (
              <div onClick={() => setSelectOpen(!selectOpen)} className="custom-select-icon">
                {selectOpen ? <FiChevronUp style={{ marginTop: '12px' }} /> : <FiChevronDown style={{ marginTop: '12px' }} />}
              </div>
            )}
            sx={{
              '& .MuiSelect-select': { overflow: 'visible !important' }
            }}
          >
            {recordsList?.length && recordsList.map((item: any, i: any) => (
              <MenuItem key={i} value={item[0]}>
                {item[1]}
              </MenuItem>
            ))}
          </Select>
          <Box sx={{ borderRadius: '7px', backgroundColor: 'white', height: '40px', minHeight: '40px', maxHeight: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', mr: 1, p: '0px' }}>
            <FabLeft onClick={handlePreviousPage} disabled={tab === 'open' ? openCurrentPage === 1 : closedCurrentPage === 1}>
              <FiChevronLeft style={{ height: '15px' }} />
            </FabLeft>
            <Typography sx={{ mt: 0, textTransform: 'lowercase', fontSize: '15px', color: '#1A3353', textAlign: 'center' }}>
              {tab === 'open' ? `${openCurrentPage} to ${openTotalPages}` : `${closedCurrentPage} to ${closedTotalPages}`}
            </Typography>
            <FabRight onClick={handleNextPage} disabled={tab === 'open' ? (openCurrentPage === openTotalPages) : (closedCurrentPage === closedTotalPages)}>
              <FiChevronRight style={{ height: '15px' }} />
            </FabRight>
          </Box>
          <Button
            variant='contained'
            startIcon={<FiPlus className='plus-icon' />}
            onClick={onAddHandle}
            className={'add-button'}
          >
            Add Lead
          </Button>
        </Stack>
      </CustomToolbar>

      {tab === 'open' ?
        <Box sx={{ p: '10px', mt: '5px' }}>
          {
            openLeads?.length ? openLeads.map((item: any, index: any) => (
              <Box key={index}>
                <Box className='lead-box'>
                  <Box className='lead-box1'>
                    <Stack className='lead-row1'>
                      <div style={{ color: '#1A3353', fontSize: '1rem', fontWeight: '500', cursor: 'pointer' }} onClick={() => selectLeadList(item?.id)}>
                        {item?.name || item?.title}
                      </div>
                      <div onClick={() => deleteLead(item?.id)}>
                        <FaTrashAlt style={{ cursor: 'pointer', color: 'gray' }} />
                      </div>
                    </Stack>
                    <Stack className='lead-row2'>
                      <div className='lead-row2-col1'>
                        <div style={{ color: 'gray', fontSize: '16px', textTransform: 'capitalize' }}>
                          {item?.company || ''} - source <span style={{ color: '#1a3353', fontWeight: 500 }}>{item?.source || '--'}</span> - status <span style={{ color: '#1a3353', fontWeight: 500 }}>{item?.status || '--'}</span>
                        </div>
                        <Box sx={{ ml: 1 }}>
                          <Label tags="Demo Tag" />
                        </Box>
                        <Box sx={{ ml: 1 }}>
                          <div style={{ display: 'flex' }}>
                            <AvatarGroup max={3}>
                              <Avatar alt={item?.name} src="">
                                {item?.name?.charAt(0)}
                              </Avatar>
                            </AvatarGroup>
                          </div>
                        </Box>
                      </div>
                      <div className='lead-row2-col2'>
                        created&nbsp; {FormatTime(item?.created_at)}&nbsp; by
                        <Avatar
                          alt={item?.name}
                          src=""
                          sx={{ ml: 1 }}
                        >
                          {item?.name?.charAt(0)}
                        </Avatar> 
                        &nbsp;&nbsp;{item?.name}
                      </div>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            )) : (loading ? <Spinner /> : <div>No open leads found</div>)
          }
        </Box>
        : <Box sx={{ p: '10px', mt: '5px' }}>
          {
            closedLeads?.length ? closedLeads.map((item: any, index: any) => (
              <Box key={index}>
                <Box className='lead-box'>
                  <Box className='lead-box1'>
                    <Stack className='lead-row1'>
                      <div style={{ color: '#1A3353', fontSize: '1rem', fontWeight: '500', cursor: 'pointer' }} onClick={() => selectLeadList(item?.id)}>
                        {item?.name || item?.title}
                      </div>
                      <div onClick={() => deleteLead(item?.id)}>
                        <FaTrashAlt style={{ cursor: 'pointer', color: 'gray' }} />
                      </div>
                    </Stack>
                    <Stack className='lead-row2'>
                      <div className='lead-row2-col1'>
                        <div style={{ color: 'gray', fontSize: '16px', textTransform: 'capitalize' }}>
                          {item?.company || ''} - source <span style={{ color: '#1a3353', fontWeight: 500 }}>{item?.source || '--'}</span> - status <span style={{ color: '#1a3353', fontWeight: 500 }}>{item?.status || '--'}</span>
                        </div>
                        <Box sx={{ ml: 1 }}>
                          <Label tags="Demo Tag" />
                        </Box>
                        <Box sx={{ ml: 1 }}>
                          <div style={{ display: 'flex' }}>
                            <AvatarGroup max={3}>
                              <Avatar alt={item?.name} src="">
                                {item?.name?.charAt(0)}
                              </Avatar>
                            </AvatarGroup>
                          </div>
                        </Box>
                      </div>
                      <div className='lead-row2-col2'>
                        created&nbsp; {FormatTime(item?.created_at)}&nbsp; by
                        <Avatar
                          alt={item?.name}
                          src=""
                          sx={{ ml: 1 }}
                        >
                          {item?.name?.charAt(0)}
                        </Avatar> 
                        &nbsp;&nbsp;{item?.name}
                      </div>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            )) : (loading ? <Spinner /> : <div>No closed leads found</div>)
          }
        </Box>}

      <DeleteModal
        onClose={deleteLeadModalClose}
        open={deleteLeadModal}
        id={selectedId}
        modalDialog={modalDialog}
        modalTitle={modalTitle}
        DeleteItem={deleteItem}
      />
    </Box>
  )
}