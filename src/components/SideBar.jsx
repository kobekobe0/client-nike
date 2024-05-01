import { useNavigate, useLocation } from 'react-router-dom';
const types = [
    'Casual',
    'Basketball',
    'Running',
    'Skateboard'
]

const sex = [
    'Men',
    'Women',
    'Kid'
]

const tag = [
    'bestsellers',
    'featured',
    'sale',
    'new'
]

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const handleChange = (name, value) => {

      
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set(name, value);
      
        // Update URL without full page reload
        navigate({
          pathname: location.pathname, // Preserve current path
          search: newSearchParams.toString(),
        });
      }; 
    return (
        <div className='w-1/5 flex-grow mx-8'>
            <h2 className="text-3xl font-normal mb-8" >Browse our list</h2>
                <form>
                    <h3 className='text-lg font-medium'>Type</h3>
                    <div className="px-4">
                        {types.map((type, index) => (
                            <div key={index} className="m-1">
                                <label className="text-lg">
                                    <input type="radio" name="type" value={type} checked={queryParams.get('type') === type.toLowerCase()} onChange={() => handleChange('type', type.toLowerCase())} />
                                    {type}
                                </label>
                            </div>
                        ))}
                    </div>

                    <h3 className='text-lg font-medium'>Sex</h3>
                    <div className="px-4">
                        {sex.map((s, index) => (
                            <div key={index}  className="m-1">
                                <label className="text-lg">
                                    <input type="radio" name="sex" value={s} checked={queryParams.get('sex') === s.toLowerCase()} onChange={() => handleChange('sex', s.toLowerCase())} />
                                    {s}
                                </label>
                            </div>
                        ))}
                    </div>

                    <h3 className='text-lg font-medium'>Tags</h3>
                    <div className="px-4">
                        {tag.map((t, index) => (
                            <div key={index} className="m-1">
                                <label className="text-lg">
                                    <input type="radio" name="tag" value={t} checked={queryParams.get('tag') === t.toLowerCase()} onChange={() => handleChange('tag', t.toLowerCase())} />
                                    {t}
                                </label>
                            </div>
                        ))}
                    </div>
                </form>
        </div>
    )

}

export default SideBar;