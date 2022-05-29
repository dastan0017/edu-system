import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'react-bootstrap'

export const TutorialForm = ({ onSubmit }) => {
  const intl = useIntl()

  const schema = yup.object().shape({
    name: yup.string().required(intl.formatMessage({ id: 'validation.is_required' })),
    description: yup.string().required(intl.formatMessage({ id: 'validation.is_required' })),
    video_link: yup.string().required(intl.formatMessage({ id: 'validation.is_required' })),
  })
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form form_container">
        {errors.name && <span>{errors.name.message}</span>}
        <label htmlFor="name">Имя публикации</label>
        <input name="name" type="text" placeholder="Имя" ref={register} />

        {errors.video_link && <span>{errors.video_link.message}</span>}
        <label htmlFor="video_link">Ссылка на YouTue видео</label>
        <input name="video_link" type="text" placeholder="Ccылка на видео" ref={register} />

        {errors.description && <span>{errors.description.message}</span>}
        <label htmlFor="description">Описание</label>
        <textarea name="description" type="text" placeholder="Описание" ref={register} />

        <Button type="submit" className="btn-primary modal_btn">
          {intl.formatMessage({ id: 'global.save' })}
        </Button>
      </form>
    </>
  )
}
TutorialForm.propTypes = {
  onSubmit: PropTypes.func,
  data: PropTypes.object,
}
