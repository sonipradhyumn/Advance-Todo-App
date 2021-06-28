import React, {Fragment, useState, useEffect} from 'react';
import Pagination from '@material-ui/lab/Pagination';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import CancelIcon from '@material-ui/icons/Cancel';

function Firstpage (props) {
  let item = [
    {
      title: 'Login',
      description: 'For more option login',
      tags: 'Requested',
      votes: '85',
      hidden: 'false',
    },
    {
      title: 'Pradhyumn soni',
      description: 'name of the person',
      tags: 'In Progress',
      votes: '25',
      hidden: 'false',
    },
    {
      title: 'Task',
      description: 'Challenge 2',
      tags: 'Done',
      votes: '25',
      hidden: 'false',
    },
  ];
  const [state, setstate] = useState (item);
  const [filter, setfilter] = useState ('all');
  const [show, setShow] = useState (state);
  const [Page, setPage] = useState (1);
  const [counts, setcount] = useState (1);
  const [ivoted, setIvoted] = useState ([]);
  const [input, setinput] = useState ({
    title: '',
    description: '',
    tags: 'Requested',
    votes: '0',
    hidden: 'false',
  });

  useEffect (
    () => {
      const idxOfLastPost = Page * 10;
      const idxOfFirstPost = idxOfLastPost - 10;
      setShow (state.slice (idxOfFirstPost, idxOfLastPost));
    },
    [Page, state]
  );

  function adding (e) {
    const {name, value} = e.target;
    if (name && value) {
      setinput ({
        ...input,
        [name]: value,
      });
    }
  }
  function refine (input) {
    let temp = [];
    state.filter (item => {
      if (item.tags === input) {
        temp.push (item);
      }else if(input === 'all')
      {temp.push (item);}
      return(<></>)
    });
    setShow (temp);
    setfilter(input)
    }

  function addItem () {
    if (input.title || input.description) {
      setstate ([...state, input]);
      setinput ({
        title: '',
        description: '',
        tags: 'Requested',
        votes: '0',
        hidden: 'false',
      });
    }
  }

  function deleteItem (i) {
    let temp = [...show];
    temp[i].hidden = 'true';
    setShow (temp);
  }

  function incvote (i) {
    let ids = [...show];
    ids[i].votes = ++ids[i].votes;
    setShow (ids);
    let temp = [...ivoted];
    temp.push (i);
    setIvoted (temp);
  }
  function decvote (i) {
    let ids = [...show];
    ids[i].votes = --ids[i].votes;
    setShow (ids);
    let temp = [...ivoted];
    let temp1 = temp.indexOf (i);
    temp[temp1] = toString (i);
    setIvoted (temp);
  }

  useEffect (
    () => {
      let temp = 1;
      for (let i = 1; i < state.length; i++) {
        if (temp === 10) {
          setcount (Page + 1);
          temp = 1;
        } else {
          temp++;
        }
      }
    },
    [state]
  );
  function Card () {
    return show.map ((item, i) => {
      if (item.hidden === 'false') {
        return (
          <div className="alignment mid" key={i}>
            <span className="seprate">
              <span className="bright">{item.title}</span>
              <span className="dull">{item.description}</span>
            </span>
            <span className=" mid">
              <button
                style={
                  props.name === 'Login for Advance Option'
                    ? {display: 'none'}
                    : {}
                }
                className="button button1"
                onClick={() => deleteItem (i)}
              >
                Delete
              </button>
              <button className="button">{item.tags}</button>
              <button
                className="seprate  button2 "
                type="votes"
                onClick={() =>
                  ivoted.includes (i) ? decvote (i) : incvote (i)}
              >
                {' '}
                {ivoted.includes (i)
                  ? <ArrowDropDownIcon
                      type={i}
                      className="icc"
                      fontSize="large"
                    />
                  : <ArrowDropUpIcon
                      type={i}
                      className="icc"
                      fontSize="large"
                    />}
                <span className="numm">{item.votes}</span>
              </button>
            </span>
          </div>
        );
      } else {
        return <Fragment />;
      }
    });
  }

  return (
    <div>

      <div className='midd'>
        {' '}
        <span>
          <button
            className="button button1"
            onClick={() => {
              refine ('Requested');
            }}
          >
            Requested
          </button>
        </span>
        <span>
          <button
            className="button button1"
            onClick={() => {
              refine ('Done');
            }}
          >
            Done
          </button>
        </span>
        <span>
          <button
            className="button button1"
            onClick={() => {
              refine ('In Progress');
            }}
          >
            In Progress
          </button>
        </span>
        <span style={filter==='all'?{display:'none'} : {'cursor': 'pointer'}}> <CancelIcon onClick={()=>{refine('all')}}/></span>
      </div>
      {<Card />}

      <Pagination
        className="center"
        onChange={(event, value) => {
          setPage (value);
        }}
        count={counts}
        color="primary"
        showFirstButton={true}
        showLastButton={true}
      />

      <div
        className="alignment seprate"
        style={
          props.name === 'Login for Advance Option' ? {display: 'none'} : {}
        }
      >
        <span className="bright">Propose a new feature request</span>
        <input
          className="itsize alignment"
          placeholder="Title"
          value={input.title}
          type="text"
          name="title"
          onChange={adding}
        />
        <input
          className="idsize alignment"
          placeholder="Feature description (optinal)"
          type="text"
          value={input.description}
          name="description"
          onChange={adding}
        />
      </div>
      <div
        style={
          props.name === 'Login for Advance Option' ? {display: 'none'} : {}
        }
      >
        {' '}
        <button className="button button1" onClick={addItem}>Post it</button>
      </div>
    </div>
  );
}

export default Firstpage;
