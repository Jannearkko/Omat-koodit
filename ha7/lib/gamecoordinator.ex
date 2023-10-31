defmodule GameCoordinator do


  def handle_player_input(player_pid) do
    IO.puts("Enter your action (hit/stand): ")
    action = String.downcase(IO.gets(""))

    case action do
      "hit" -> Player.hit(player_pid)
      "stand" -> Player.stand(player_pid)
      _ -> IO.puts("Invalid action. Enter 'hit' or 'stand'")
      handle_player_input(player_pid)
    end
  end

  def start_game() do

    player_pid = Player.start_link()
    dealer_pid = Dealer.start_link()

    deck = BlackjackGame.generate_deck

    {player_hand, dealer_hand} = BlackjackGame.deal_hands(deck)

    Player.receive_initial_cards(player_pid, player_hand)
    Dealer.receive_initial_cards(dealer_pid, dealer_hand)

    handle_player_input(player_pid)
  end
end
