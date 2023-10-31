defmodule Dealer do

  def start_link() do
    Task.start_link(__MODULE__, :ok, name: __MODULE__)
  end
  defstruct hand: [], score: 0

  def deal_card(pid, card) do
    send(pid, {:deal_card, self(), card})
  end
  def handler({:deal_card, dealer_pid, card}, state) do
    new_hand = [card | state.hand]
    new_score = BlackjackGame.calculate_hand_value(new_hand)
    new_state = %{state | hand: new_hand, score: new_score}
    send(dealer_pid, {:dealer_state, new_state})
    {:noreply, new_state}
  end
  def receive_initial_cards(pid, cards) do
    {:ok, %Dealer{hand: cards}}
  end

end
