import React, {Fragment, useState, useEffect} from 'react';
import Pagination from '@material-ui/lab/Pagination';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
/* @ todo 
google signin integration 
pagination integration ---------------------------DONE
admin and user view
icon and style proper
add tags also
*/
function Firstpage (props) {
  let item = [
    {
      title: 'Login',
      description: 'For more option login',
      votes: '85',
      hidden: 'false',
    },
    {
      title: 'Pradhyumn soni',
      description: 'name of the person',
      votes: '25',
      hidden: 'false',
    },
  ];
  const [state, setstate] = useState (item);
  const [show, setShow] = useState (item);
  const [input, setinput] = useState ({
    title: '',
    description: '',
    votes: '0',
    hidden: 'false',
  });
  const [Page, setPage] = useState (1);
  const [vote, setVote] = useState (false);
  const [ivoted, setIvoted] = useState ([]);

  // let vote = []

  useEffect (
    () => {
      const indxOfLastPost = Page * 10;
      const indxOffirstPost = indxOfLastPost - 10;
      setShow (state.slice (indxOffirstPost, indxOfLastPost));
      //setVotes(show.map((item)=>item.votes))
      console.log ('****show***', show);
      //  const indxOfLastPost
    },
    [Page, state]
  );

  //   useEffect(() => {
  //   //  function vote(){
  //         setVotes(show.map((item)=>item))
  //    // }
  //  }, [Page])
  // console.log('votes',votes)
  //   const { state } = usePagination({
  //     count: 10,
  //   });

  function adding (e) {
    const {name, value} = e.target;
    setinput ({
      ...input,
      [name]: value,
    });
  }

  function addItem () {
    setstate ([...state, input]);
    setinput ({title: '', description: '', votes: '0', hidden: 'false'});
    console.log (item);
  }
  function deleteItem (i) {
    let temp = [...show];
    temp[i].hidden = 'true';
    setShow (temp);
    // setVote(true)
  }

  function incvote (i) {
    let ids = [...show];
    console.log (ids[i].votes); // create the copy of state array
    ids[i].votes = ++ids[i].votes;
    //new value
    setShow (ids);

    let temp = [...ivoted];
    temp.push (i);
    setIvoted (temp);
    setVote (true);
  }
  function decvote (i) {
    let ids = [...show];
    console.log (ids[i].votes); // create the copy of state array
    ids[i].votes = --ids[i].votes;
    setShow (ids);
    let temp = [...ivoted];
    let temp1 = temp.indexOf (i);
    temp[temp1] = toString (i);
    setIvoted (temp);
  }
  console.log (ivoted);
  console.log (vote);
  // useEffect(() => {
  //     setVotes(state.map((item)=>item.votes))
  // }, [Page])
  function Card () {
    return console.log (item), show.map ((item, i) => {
      console.log (item.hidden);
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
              <button className="button">Requested</button>
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
      }
      else{return(<></>)}});
  }
  console.log ('hello', input);

  return (
    <div>

      <div>
        {' '}
        <span>
          <button className="button button1" onClick={addItem}>
            Requested
          </button>
        </span>
        <span>
          <button className="button button1" onClick={addItem}>Done</button>
        </span>
        <span>
          <button className="button button1" onClick={addItem}>
            In Progress
          </button>
        </span>
      </div>
      {<Card />}

      <Pagination
        className="center"
        defaultPage={Page}
        onChange={(event, value) => {
          setPage (value);
        }}
        count={10}
        color="primary"
        showFirstButton={true}
        showLastButton={true}
      />

      <div
        className="alignment"
        style={
          props.name === 'Login for Advance Option' ? {display: 'none'} : {}
        }
      >
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
        {' '}<button className="button" onClick={addItem}>Post it</button>
      </div>
    </div>
  );
}

export default Firstpage;
