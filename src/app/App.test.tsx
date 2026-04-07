import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the HireGraph sidebar title', () => {
    render(<App />)
    expect(screen.getByText('HireGraph')).toBeInTheDocument()
  })

  it('renders the sidebar navigation items', () => {
    render(<App />)
    expect(screen.getAllByText('New Pipeline').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Results')).toBeInTheDocument()
    expect(screen.getByText('Outreach')).toBeInTheDocument()
    expect(screen.getByText('Bias Report')).toBeInTheDocument()
  })

  it('renders the pipeline view with job description textarea', () => {
    render(<App />)
    expect(screen.getByText('Job Description')).toBeInTheDocument()
    expect(screen.getByText('Run Demo Mode')).toBeInTheDocument()
  })

  it('shows empty state when switching to results without running pipeline', () => {
    render(<App />)
    fireEvent.click(screen.getByText('Results'))
    expect(screen.getByText('Run a pipeline first to see results.')).toBeInTheDocument()
  })

  it('renders demo mode badge in sidebar footer', () => {
    render(<App />)
    expect(screen.getByText('Demo Mode')).toBeInTheDocument()
  })

  it('shows empty state when switching to outreach without running pipeline', () => {
    render(<App />)
    fireEvent.click(screen.getByText('Outreach'))
    expect(screen.getByText('Run a pipeline first to generate outreach.')).toBeInTheDocument()
  })

  it('shows empty state when switching to bias report without running pipeline', () => {
    render(<App />)
    fireEvent.click(screen.getByText('Bias Report'))
    expect(screen.getByText('Run a pipeline first to see the bias report.')).toBeInTheDocument()
  })

  it('renders the outreach view title when navigating to outreach', () => {
    render(<App />)
    fireEvent.click(screen.getByText('Outreach'))
    expect(screen.getByRole('heading', { name: 'Outreach Emails' })).toBeInTheDocument()
  })

  it('renders the bias report view title when navigating to bias', () => {
    render(<App />)
    fireEvent.click(screen.getByText('Bias Report'))
    expect(screen.getByRole('heading', { name: 'Bias Report' })).toBeInTheDocument()
  })
})
