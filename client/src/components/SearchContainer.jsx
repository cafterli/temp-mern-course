import { FormRow, FormRowSelect, SubmitBtn } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from '../../../utils/constants';
import { useAllJobsContext } from '../pages/AllJobs';

const SearchContainer = () => {
  const { searchValues } = useAllJobsContext()
  const { search, jobStatus, jobType, sort } = searchValues
  const submit = useSubmit()

  const debounce = (onChange) => {
    let timeout
    return (e) => {
      const form = e.currentTarget.form
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        onChange(form)
      }, 2000)
    }
  }
  return (
    <Wrapper>
      <Form className='form'>
        <h5 className="form-title">Search Form</h5>
        <div className='form-center'>
          <FormRow
            type="search"
            name='search'
            defaultValue={search}
            onChange={debounce((form)=>{
              submit(form)
            })} 
          />
          <FormRowSelect
            labelText='job status'
            name='jobStatus'
            list={['all', ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }} 
          />
          <FormRowSelect
            labelText='job type'
            name='jobType'
            list={['all', ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }} 
          />
          <FormRowSelect
            name='sort'
            list={[...new Set(['newest', ...Object.values(JOB_SORT_BY)])]} // Remove duplicates
            defaultValue={sort}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }} 
          />
          <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>
            Reset Search Values
          </Link>
          <SubmitBtn formBtn/>
        </div>
      </Form>
    </Wrapper>
  )
}

export default SearchContainer