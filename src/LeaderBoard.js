import React, {Component} from 'react'


const LeaderBoardModal = props => {
  const table = props.leaderboardprops.map((user, index) => {
        return (


          <tbody>
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{user.username}</td>
              <td>{user.win_count}</td>
              <td>{user.loss_count}</td>
            </tr>
          </tbody>



        )
    })

      return(
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">tARble</h5>
              </div>
              <div class="modal-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Player</th>
                    <th scope="col">Wins</th>
                    <th scope="col">Losses</th>
                  </tr>
                </thead>
                  {table}
                </table>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      )
    }

export default LeaderBoardModal
