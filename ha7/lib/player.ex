defmodule Player do
  def start_link() do
    Task.start_link(__MODULE__, :ok, name: __MODULE__)
  end
  defstruct hand: [], score: 0

  def hit(pid) do
    send(pid, {:hit, self()})
  end

  def stand(pid) do
    send(pid, {:stand, self()})
  end

  def handler({:deal_card, dealer_pid, card}, state) do
    new_hand = [card | state.hand]
    new_score = BlackjackGame.calculate_hand_value(new_hand)
    new_state = %{state | hand: new_hand, score: new_score}
    send(dealer_pid, {:player_state, new_state})
    {:noreply, new_state}
  end
  def receive_initial_cards(pid, cards) do
    {:ok, %Player{hand: cards}}
  end

end
